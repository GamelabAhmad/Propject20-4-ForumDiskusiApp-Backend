const express = require("express");
const {
  handleVoteQuestion,
  handleDownvoteQuestion,
  handleGetVotes,
} = require("../controllers/controllerQuestionLike");

const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/vote/:questionId", auth, handleVoteQuestion); // Add questionId as route param
router.post("/downvote/:questionId", auth, handleDownvoteQuestion); // Add questionId as route param
router.get("/votes/:questionId", handleGetVotes);

/**
 * @swagger
 * /vote/{questionId}:
 *   post:
 *     summary: Upvote a question
 *     tags:
 *       - Question Vote
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to upvote
 *         schema:
 *           type: string
 *           example: clx8giv440000dvi3rr9zbekl
 *     responses:
 *       200:
 *         description: Question upvoted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /downvote/{questionId}:
 *   post:
 *     summary: Downvote a question
 *     tags:
 *       - Question Vote
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to downvote
 *         schema:
 *           type: string
 *           example: clx8giv440000dvi3rr9zbekl
 *     responses:
 *       200:
 *         description: Question downvoted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /votes/{questionId}:
 *   get:
 *     summary: Get votes for a question
 *     tags:
 *       - Question Vote
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to get votes for
 *         schema:
 *           type: string
 *           example: clx8giv440000dvi3rr9zbekl
 *     responses:
 *       200:
 *         description: A list of votes for the question
 *       404:
 *         description: Question not found
 *       400:
 *         description: Bad request
 */
module.exports = router;
