const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;


export const uploadToCloudinary = async (pics, fileType) => {
    try {
        if (pics && fileType) {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", upload_preset);
            data.append("cloud_name", cloud_name);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
                { method: "post", body: data }
            );

            if (!res.ok) {
                throw new Error(`Failed to upload image: ${res.statusText}`);
            }

            const fileData = await res.json();
            console.log("Response--- ", fileData.url);
            return fileData.url;
        } 
        else {
            throw new Error("Invalid input: pics or fileType is missing");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null; // Or throw error if preferred
    }
};
