const { findUserByUsername, findUserById } = require("../services/serviceAuth");
const { editUser, editUserLogin } = require("../services/serviceUser");
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

// handle profile user yang sedang login
const handleGetLoggedInUserProfile = async (req, res) => {
  try {
    const userId = req.user.userToken; // Extract userId from the token
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// Handle edit profile sesuai user yang login
const handleEditLoggedInUserProfile = async (req, res) => {
  try {
    const userId = req.user.userToken; // Extract userId from the token
    const newData = req.body;

    if (req.files && req.files.image) {
      const file = req.files.image;
      const response = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "uploads",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      newData.avatar = response.secure_url;
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await editUserLogin(user.uuid, newData); // Assuming editUser uses uuid to update
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};



module.exports = {
  handleGetUser,
  handleEditUser,
  handleGetLoggedInUserProfile,
  handleEditLoggedInUserProfile
};
