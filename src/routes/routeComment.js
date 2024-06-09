const express = require("express");
const {
  handleCreateComment,
  handleGetComments,
  handleGetComment,
  handleDeleteComment,
  handleEditComment,
  handleGetCommentEachQuestion,
} = require("../controllers/controllerComment");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/comment/:id", auth, handleCreateComment);
router.put("/comment/:id", auth, handleEditComment);
router.delete("/comment/:id", auth, handleDeleteComment);

router.get("/comment/:id", handleGetComment);
router.get("/comments/:id", handleGetCommentEachQuestion);
router.get("/comments", handleGetComments);

module.exports = router;
