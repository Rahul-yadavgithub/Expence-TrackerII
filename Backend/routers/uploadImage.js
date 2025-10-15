// routers/uploadImage.js
const express = require("express");
const upload = require("../middleware/multer.js"); // multer memory storage
const { uploadOnCloudinary } = require("../configuration/cloudinary"); // your function
const fs = require("fs");
const path = require("path");

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Step 1: Create a temporary file path
    const tmpDir = path.join(__dirname, "../tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const tempFilePath = path.join(tmpDir, `${Date.now()}_${req.file.originalname}`);

    // Step 2: Write multer memory buffer to temp file
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Step 3: Call your existing function
    const url = await uploadOnCloudinary(tempFilePath);

    if (!url) return res.status(500).json({ message: "Cloudinary upload failed" });

    return res.json({ url });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = uploadRouter;
