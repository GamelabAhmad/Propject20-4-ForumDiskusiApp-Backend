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

router.get("/comments/:id", handleGetCommentEachQuestion);

// ga kepke mungkin
router.get("/comment/:id", handleGetComment);
router.get("/comments", handleGetComments);

/**
 * @swagger
 * /comment/{questionId}:
 *   post:
 *     summary: Create a comment
 *     tags:
 *       - Comment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to comment on
 *         schema:
 *           type: string
 *           example: clx8giv440000dvi3rr9zbekl
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 example: "Ini body"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Edit a comment
 *     tags:
 *       - Comment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to edit
 *         schema:
 *           type: string
 *           example: clx9w4mbe0000dy1titg2gppx
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 example: "dah diedit"
 *     responses:
 *       200:
 *         description: Comment edited successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *           example: clx8h7c0n0000a4u5ygtripcc
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /comments/{questionId}:
 *   get:
 *     summary: Get all comments for a specific question
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: ID of the question to retrieve comments for
 *         schema:
 *           type: string
 *           example: clx8giv440000dvi3rr9zbekl
 *     responses:
 *       200:
 *         description: A list of comments for the question
 *       404:
 *         description: Question not found
 *       400:
 *         description: Bad request
 */
module.exports = router;
