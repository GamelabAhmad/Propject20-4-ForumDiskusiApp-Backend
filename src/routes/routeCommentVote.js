const express = require("express");
const {
  handleVoteComment,
  handleDownvoteComment,
  handleGetCommentVotes,
} = require("../controllers/controllerCommentVote");

const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/like/:commentId", auth, handleVoteComment);
router.post("/unlike/:commentId", auth, handleDownvoteComment);
router.get("/likes/:commentId", handleGetCommentVotes);

/**
 * @swagger
 * /like/{commentId}:
 *   post:
 *     summary: Like a comment
 *     tags:
 *       - Comment Vote
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to like
 *         schema:
 *           type: string
 *           example: clx9w4mbe0000dy1titg2gppx
 *     responses:
 *       200:
 *         description: Comment liked successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /unlike/{commentId}:
 *   post:
 *     summary: Unlike a comment
 *     tags:
 *       - Comment Vote
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to unlike
 *         schema:
 *           type: string
 *           example: clx9w4mbe0000dy1titg2gppx
 *     responses:
 *       200:
 *         description: Comment unliked successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /likes/{commentId}:
 *   get:
 *     summary: Get likes for a comment
 *     tags:
 *       - Comment Vote
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to get likes for
 *         schema:
 *           type: string
 *           example: clx9w4mbe0000dy1titg2gppx
 *     responses:
 *       200:
 *         description: A list of likes for the comment
 *       404:
 *         description: Comment not found
 *       400:
 *         description: Bad request
 */
module.exports = router;
