import axios from "axios";

const uploadToCloudinary = async (file: File, type: "image" | "video") => {
    const path = import.meta.env.VITE_ENV === "production" ? "prod/" : "dev/"

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "unsigned_machines"); // your preset name

    const folderName = type === "video" ? `${path}machines/videos` : `${path}machines/images`;
    data.append("folder", folderName);

    const cloudName = "dxc2vrlcu"; // replace with yours
    const endpoint =
        type === "video"
            ? `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`
            : `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await axios.post(endpoint, data)

    const result = res.data
    console.log(result.public_id)
    return {
        url: result.secure_url,
        publicId: result.public_id,
    };
};


export default uploadToCloudinary