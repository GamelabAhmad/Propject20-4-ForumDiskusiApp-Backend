const express = require("express");
const {
  createQuestionController,
  handleGetQuestion,
  handleEditQuestion,
  handleDeleteQuestion,
  handleSearchQuestions,
  handleGetQuestions,
  handleGetQuestionsByUser,
  handleGetQuestionsByUserId,
  handleGetQuestionsByForumId,
  handleGetQuestionsByTopicId,
  createValidationQuestion,
  createQuestionInForum,
} = require("../controllers/controllerQuestion");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");

router.post(
  "/question",
  auth,
  validateRequest(createValidationQuestion),
  createQuestionController
);
router.get("/question/:id", handleGetQuestion);
router.put("/question/:id", auth, handleEditQuestion);
router.delete("/question/:id", auth, handleDeleteQuestion);
router.get("/question", handleSearchQuestions);
router.get("/questions", handleGetQuestions);
router.get("/questionByUser", auth, handleGetQuestionsByUser);
router.get("/questionByUser/:userId", handleGetQuestionsByUserId);
router.get("/questionsByTopic/:topicId", handleGetQuestionsByTopicId);

//question in forum
router.post("/questionsByForum/:forumId", auth, createQuestionInForum);
router.get("/questionsByForum/:forumId", auth, handleGetQuestionsByForumId);

/**
 * @swagger
 * /question:
 *   post:
 *     summary: Create a question
 *     tags:
 *       - Question
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Question Title
 *               body:
 *                 type: string
 *                 example: Question Body
 *               image:
 *                 type: string
 *                 example: http://example.com/image.jpg
 *               topic:
 *                 type: string
 *                 example: Topic Name
 *     responses:
 *       201:
 *         description: Question created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /question/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the question to retrieve
 *         schema:
 *           type: string
 *           example: clx8giv440000dvi3rr9zbekl
 *     responses:
 *       200:
 *         description: A single question
 *       404:
 *         description: Question not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /question/{id}:
 *   put:
 *     summary: Update a question by ID
 *     tags:
 *       - Question
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the question to update
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
 *               title:
 *                 type: string
 *                 example: Updated Question Title
 *               body:
 *                 type: string
 *                 example: Updated Question Body
 *               image:
 *                 type: string
 *                 example: http://example.com/new_image.jpg
 *               topic:
 *                 type: string
 *                 example: Updated Topic
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /question/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags:
 *       - Question
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the question to delete
 *         schema:
 *           type: string
 *           example: clx8giv440000dvi3rr9zbekl
 *     responses:
 *       204:
 *         description: Question deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /question:
 *   get:
 *     summary: Search for questions
 *     tags:
 *       - Question
 *     responses:
 *       200:
 *         description: A list of questions
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags:
 *       - Question
 *     responses:
 *       200:
 *         description: A list of questions
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /questionByUser:
 *   get:
 *     summary: Get questions by the authenticated user
 *     tags:
 *       - Question
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of questions by the user
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /questionByUser/{userId}:
 *   get:
 *     summary: Get questions by a specific user ID
 *     tags:
 *       - Question
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve questions for
 *         schema:
 *           type: string
 *           example: clx7pztiv00009klnalygklt0
 *     responses:
 *       200:
 *         description: A list of questions by the user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /questionsByTopic/{topicId}:
 *   get:
 *     summary: Get questions by a topic ID
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         description: ID of the topic to retrieve questions for
 *         schema:
 *           type: string
 *           example: clx97v5fw0000ltr2tzuxqe5t
 *     responses:
 *       200:
 *         description: A list of questions by the topic
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /questionsByForum/{forumId}:
 *   post:
 *     summary: Create a question in a forum
 *     tags:
 *       - Question
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         description: ID of the forum to create a question in
 *         schema:
 *           type: string
 *           example: clx8i6zrd000011awqf8k9ecg
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Question Title"
 *               body:
 *                 type: string
 *                 example: "Question Body"
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               topic:
 *                 type: string
 *                 example: "Topic Name"
 *     responses:
 *       201:
 *         description: Question created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /questionsByForum/{forumId}:
 *   get:
 *     summary: Get questions by a forum ID
 *     tags:
 *       - Question
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         description: ID of the forum to retrieve questions for
 *         schema:
 *           type: string
 *           example: clx8i6zrd000011awqf8k9ecg
 *     responses:
 *       200:
 *         description: A list of questions by the forum
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
module.exports = router;
