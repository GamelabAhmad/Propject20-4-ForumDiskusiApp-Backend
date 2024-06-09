const express = require("express");
const {
    handleVoteQuestion,
    handleDownvoteQuestion,
    handleGetVotes
} = require("../controllers/controllerQuestionLike");

const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/vote/:questionId", auth, handleVoteQuestion); // Add questionId as route param
router.post("/downvote/:questionId", auth, handleDownvoteQuestion); // Add questionId as route param
router.get("/votes/:questionId", handleGetVotes);

module.exports = router;
