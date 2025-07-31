const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true }
});

const VideoSchema = new mongoose.Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true }
});

const MachineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        shortDescription: { type: String, required: true },
        fullDescription: { type: String, required: true },
        power: { type: [String], required: true },
        capacity: { type: [String], required: true },
        media: {
            images: [ImagesSchema],
            videos: [VideoSchema]
        },
        featured: { type: Boolean, default: false },
        tags: { type: [String] },
        weight: { type: String },
        dimensions: { type: String },
        materials: { type: String, required: true }
    }
);

module.exports = mongoose.model("Machine", MachineSchema);
