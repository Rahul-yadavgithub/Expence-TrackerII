// configuration/cloudinary.js
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// This function uploads a **local file** to Cloudinary
const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;

    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });

    // delete temp file after upload
    fs.unlinkSync(filepath);

    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload failed:", err.message);
    return null;
  }
};

module.exports = { cloudinary, uploadOnCloudinary };
