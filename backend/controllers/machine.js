const Machine = require("../models/machine");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const compressAndOverwrite = require("../utils/overwriteWithCompressed")

// CREATE
exports.createMachine = async (req, res) => {
    try {
        console.log(req.body)
        const { images = [], videos = [] } = req.body

        const imageResults = await Promise.all(
            images.map(async img => {
                const res = await compressAndOverwrite({
                    url: img.url,
                    publicId: img.publicId,
                    resource_type: "image",
                });
                console.log("nwigiri", res.success)
                return res.success ? {
                    url: res.result.secure_url,
                    publicId: res.result.public_id,
                } : null;
            })
        );
        const videoResults = await Promise.all(
            videos.map(async vid => {
                const res = await compressAndOverwrite({
                    url: vid.url,
                    publicId: vid.publicId,
                    resource_type: "video",
                });
                console.log("nwigiri", res.success)
                return res.success ? {
                    url: res.result.secure_url,
                    publicId: res.result.public_id,
                } : null;
            })
        );

        const machineData = {
            ...req.body,
            media: {
                images: imageResults.filter(Boolean),
                videos: videoResults.filter(Boolean),
            },
        };
        console.info(true, machineData)
        const machine = new Machine(machineData);
        const saved = await machine.save();
        res.status(201).json({
            message: "created successfully",
            data: saved,
        });
    } catch (error) {
        console.error("❌ Create error:", error);
        res.status(500).json({ message: "Failed to create machine", error });
    }
};

// Other CRUD endpoints remain the same — I’ll keep them short:
exports.getMachines = async (req, res) => {
    try {
        const machines = await Machine.find();
        res.status(200).json({ message: "retrieved successfully", machines });
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
