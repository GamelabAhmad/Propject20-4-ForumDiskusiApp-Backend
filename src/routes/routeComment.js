const express = require("express");
const validateRequest = require("../middlewares/validation");
const {
  handleCreateComment,
  handleGetComments,
  handleGetComment,
  handleDeleteComment,
  handleEditComment,
  handleGetCommentEachQuestion,
  commentSchema,
} = require("../controllers/controllerComment");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/comment/:id",
  auth,
  validateRequest(commentSchema),
  handleCreateComment
);
router.put(
  "/comment/:id",
  auth,
  validateRequest(commentSchema),
  handleEditComment
);
router.delete("/comment/:id", auth, handleDeleteComment);

router.get("/comment/:id", handleGetComment);
router.get("/comments/:id", handleGetCommentEachQuestion);
router.get("/comments", handleGetComments);

module.exports = router;
