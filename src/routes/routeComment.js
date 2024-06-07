const express = require("express");
const {
  handleCreateComment,
  handleGetComments,
  handleGetComment,
} = require("../controllers/controllerComment");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/comment/:id", auth, handleCreateComment);
router.get("/comments", handleGetComments);
router.get("/:id", handleGetComment);

module.exports = router;
