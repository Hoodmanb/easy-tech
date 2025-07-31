const Machine = require("../models/machine");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const uploadMediaToCloudinary = async (files = []) => {
    const images = [];
    const videos = [];

    for (const file of files) {
        const isVideo = file.mimetype.startsWith("video/");
        const type = isVideo ? "video" : "image";

        const options = {
            resource_type: type,
            folder: `machines/${type}s`,
            quality: "auto",
            fetch_format: "auto",
            ...(isVideo && { bit_rate: "800k", format: "mp4" }),
        };

        const uploaded = await cloudinary.uploader.upload(file.path, options);
        fs.unlinkSync(file.path);

        const media = {
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
        };

        isVideo ? videos.push(media) : images.push(media);
    }

    return { images, videos };
};

// CREATE
exports.createMachine = async (req, res) => {
    try {
        const { images, videos } = await uploadMediaToCloudinary(req.files || []);

        const machineData = {
            ...req.body,
            media: { images, videos },
        };

        const machine = new Machine(machineData);
        const saved = await machine.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("❌ Create error:", error);
        res.status(500).json({ message: "Failed to create machine", error });
    }
};

// Other CRUD endpoints remain the same — I’ll keep them short:
exports.getMachines = async (req, res) => {
    try {
        const machines = await Machine.find();
        res.status(200).json(machines);
    } catch (error) {
        res.status(500).json({ message: "Fetch failed", error });
    }
};

exports.getMachineById = async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);
        if (!machine) return res.status(404).json({ message: "Not found" });
        res.status(200).json(machine);
    } catch (error) {
        res.status(500).json({ message: "Fetch failed", error });
    }
};

// UPDATE (optionally handle media uploads too if you want)
exports.updateMachine = async (req, res) => {
    try {
        const updated = await Machine.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error });
    }
};

// DELETE (remove from DB and Cloudinary)
exports.deleteMachine = async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);
        if (!machine) return res.status(404).json({ message: "Not found" });

        const { images, videos } = machine.media;

        // Remove from Cloudinary
        for (const img of images) {
            await cloudinary.api.delete_resources([img.publicId], { resource_type: "image" });
        }

        for (const vid of videos) {
            await cloudinary.api.delete_resources([vid.publicId], { resource_type: "video" });
        }

        await machine.deleteOne();
        res.status(200).json({ message: "Machine deleted" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error });
    }
};
