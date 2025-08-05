// const { v2: cloudinary } = require("cloudinary");
const cloudinary = require("./cloudinary");
const axios = require("axios");
const stream = require("stream");
const { promisify } = require("util");

const pipeline = promisify(stream.pipeline);

const compressAndOverwrite = async ({ url, publicId, resource_type }) => {
    try {
        console.log(`📦 Starting compression for ${resource_type}: ${publicId}`);
        console.log(`🔗 Original URL: ${url}`);

        // Step 1: Generate compressed version
        const compressResult = await cloudinary.uploader.explicit(publicId, {
            type: "upload",
            eager: [
                {
                    quality: "auto:eco",
                    fetch_format: "auto",
                },
            ],
            eager_async: false,
            resource_type,
        });

        console.log(`✅ Compression response:`, JSON.stringify(compressResult, null, 2));

        const compressedUrl = compressResult.eager?.[0]?.secure_url;
        if (!compressedUrl) throw new Error("Compression failed or URL missing");

        console.log(`🗜️ Compressed URL: ${compressedUrl}`);

        // Step 2: Stream the compressed file back to Cloudinary to overwrite
        console.log(`📥 Downloading compressed file from: ${compressedUrl}`);
        const response = await axios({
            method: "GET",
            url: compressedUrl,
            responseType: "stream",
            timeout: 60000 * 5,
        });

        console.log(`🚀 Starting stream upload to overwrite original on Cloudinary...`);
        const result = await new Promise((resolve, reject) => {
            const cloudStream = cloudinary.uploader.upload_stream(
                {
                    public_id: publicId,
                    overwrite: true,
                    resource_type,
                },
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );

            pipeline(response.data, cloudStream).catch(reject);
        });

        console.log(`🎉 Upload complete for ${publicId}`);
        console.log(`🌐 Final Cloudinary URL: ${result.secure_url}`);

        return { success: true, result };
    } catch (error) {
        console.error(`❌ Error compressing ${resource_type} [${publicId}]:`, error);
        return { success: false, publicId, error: error.message };
    }
};

module.exports = compressAndOverwrite;
