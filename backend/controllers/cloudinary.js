const cloudinary = require("../utils/cloudinary")

export const uploadMedia = async (path, type) => {
    const isVideo = type === "video";

    const options = {
        resource_type: isVideo ? "video" : "image",
        unique_filename: false,
        folder: isVideo ? "machines/videos" : "machines/images",
        quality: "auto",
        fetch_format: "auto",
        ...(isVideo && {
            bit_rate: "800k",
            format: "mp4",
        })
    };

    try {
        const result = await cloudinary.uploader.upload(path, options);

        if (result?.public_id) {
            console.log("✅ Upload & compression successful:", result.public_id);
            return result.public_id;
        } else {
            console.log("❌ Upload failed:", result);
            return null;
        }
    } catch (error) {
        console.error("❌ Upload error:", error);
        return null;
    }
};


export const deleteMedia = async (publicId, type) => {
    try {
        const response = await cloudinary.api.delete_resources([publicId], {
            resource_type: type === "video" ? "video" : "image"
        });

        const status = response?.deleted?.[publicId];

        if (status === "deleted") {
            console.log("🗑️ Deleted successfully:", publicId);
            return true;
        } else if (status === "not_found") {
            console.warn("⚠️ Resource not found:", publicId);
            return false;
        } else {
            console.warn("❓ Unknown delete status:", status);
            return false;
        }
    } catch (error) {
        console.error("❌ Delete error:", error);
        return false;
    }
};
