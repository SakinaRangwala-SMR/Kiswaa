import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // ensure .env is loaded

// ✅ Configure Cloudinary once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // fixed key name
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // auto-detect file type
    });

    // Delete the local file after upload
    fs.unlinkSync(filePath);

    // Return Cloudinary secure URL
    return uploadResult.secure_url;
  } catch (error) {
    // Clean up local file if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
