const express = require("express");
const {
    handleVoteComment,
    handleDownvoteComment,
    handleGetCommentVotes
} = require("../controllers/controllerCommentVote");

const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/like", auth, handleVoteComment);
router.post("/unlike", auth, handleDownvoteComment);
router.get("/likes/:commentId", handleGetCommentVotes);

module.exports = router;
