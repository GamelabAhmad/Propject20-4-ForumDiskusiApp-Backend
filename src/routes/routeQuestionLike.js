const express = require("express");
const {
    handleVoteQuestion,
    handleDownvoteQuestion,
    handleGetVotes
} = require("../controllers/controllerQuestionLike");

const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/vote", auth, handleVoteQuestion);
router.post("/downvote", auth, handleDownvoteQuestion);
router.get("/votes/:questionId", handleGetVotes);

module.exports = router;
