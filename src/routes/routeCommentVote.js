const express = require("express");
const {
    handleVoteComment,
    handleDownvoteComment,
    handleGetCommentVotes
} = require("../controllers/controllerCommentVote");

const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/like/:commentId", auth, handleVoteComment);
router.post("/unlike/:commentId", auth, handleDownvoteComment);
router.get("/likes/:commentId", handleGetCommentVotes);

module.exports = router;
