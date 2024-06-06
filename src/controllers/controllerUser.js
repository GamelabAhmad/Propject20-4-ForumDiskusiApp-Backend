const { findUserByUsername } = require("../services/serviceAuth");
const { editUser } = require("../services/serviceUser");
const cloudinary = require("../config/cloudinaryConfig");

const handleGetUser = async (req, res) => {
  try {
    const username = req.params.id;
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const handleEditUser = async (req, res) => {
  try {
    const username = req.params.id;
    const newData = req.body;

    if (req.files && req.files.image) {
      const file = req.files.image;
      const response = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "uploads",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      newData.avatar = response.secure_url;
    }

    const user = await findUserByUsername(username);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await editUser(username, newData);
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  handleGetUser,
  handleEditUser,
};
