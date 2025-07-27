import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const deleteFromCloudinary = async(publicURL)=>{
    try {
        if(!publicURL) return null;

        //taking out public ID from publicURL
        const publicIDToDelete = publicURL.split("/").slice(-1)[0].split(".")[0]
        const result = await cloudinary.uploader.destroy(publicIDToDelete)
        return result;
    } catch (error) {
        return null
    }
}

export {deleteFromCloudinary}