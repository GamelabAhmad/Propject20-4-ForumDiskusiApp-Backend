const cloudinary = require("../config/cloudinaryConfig");

const imageUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.image;

    const response = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "uploads",
      allowed_formats: ["jpg", "jpeg", "png"],
    });
    res.status(200).json({ url: response.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image to Cloudinary" });
  }
};

module.exports = { imageUpload };
