const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  handleGetUser,
  handleEditUser,
} = require("../controllers/controllerUser");

router.get("/profile/:id", handleGetUser);

router.put("/setting/:id", auth, handleEditUser);

module.exports = router;
