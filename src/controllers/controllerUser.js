const { findUserByUsername } = require("../services/serviceAuth");
const { editUser } = require("../services/serviceUser");

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

    const user = findUserByUsername(username);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const newData = req.body;

    const newUser = await editUser(username, newData);
    res.status(200).json({ message: "User updated successfully", newUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  handleGetUser,
  handleEditUser,
};
