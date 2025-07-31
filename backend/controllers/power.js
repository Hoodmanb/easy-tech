const Power = require("../models/Power");

// CREATE
exports.createPower = async (req, res) => {
    try {
        const power = new Power(req.body);
        const saved = await power.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("❌ Create Power Error:", error);
        res.status(500).json({ message: "Failed to create power option", error });
    }
};

// GET ALL
exports.getPowers = async (req, res) => {
    try {
        const powers = await Power.find();
        res.status(200).json(powers);
    } catch (error) {
        console.error("❌ Fetch Powers Error:", error);
        res.status(500).json({ message: "Failed to fetch power options", error });
    }
};

// GET ONE
exports.getPowerById = async (req, res) => {
    try {
        const power = await Power.findById(req.params.id);
        if (!power) return res.status(404).json({ message: "Power option not found" });
        res.status(200).json(power);
    } catch (error) {
        console.error("❌ Get Power Error:", error);
        res.status(500).json({ message: "Failed to fetch power option", error });
    }
};

// UPDATE
exports.updatePower = async (req, res) => {
    try {
        const updated = await Power.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "Power option not found" });
        res.status(200).json(updated);
    } catch (error) {
        console.error("❌ Update Power Error:", error);
        res.status(500).json({ message: "Failed to update power option", error });
    }
};

// DELETE
exports.deletePower = async (req, res) => {
    try {
        const deleted = await Power.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Power option not found" });
        res.status(200).json({ message: "Power option deleted successfully" });
    } catch (error) {
        console.error("❌ Delete Power Error:", error);
        res.status(500).json({ message: "Failed to delete power option", error });
    }
};
