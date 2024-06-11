const express = require("express");
const router = express.Router();
const { auth, moderator } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");
const {
  handleCreateTopic,
  handleGetTopics,
  handleGetTopic,
  handleEditTopic,
  handleDeleteTopic,
  createTopicSchema,
} = require("../controllers/controllerTopic");

router.post(
  "/topic",
  auth,
  moderator,
  validateRequest(createTopicSchema),
  handleCreateTopic
);

router.get("/topics", handleGetTopics);

router.get("/topic/:id", handleGetTopic);

router.put("/topic/:id", auth, moderator, handleEditTopic);

router.delete("/topic/:id", auth, moderator, handleDeleteTopic);

/**
 * @swagger
 * /topic:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a topic (moderator only)
 *     tags:
 *       - Topic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: nama topic
 *     responses:
 *       201:
 *         description: Topic created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     tags:
 *       - Topic
 *     responses:
 *       200:
 *         description: A list of topics
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /topic/{id}:
 *   get:
 *     summary: Get a topic by ID
 *     tags:
 *       - Topic
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the topic to retrieve
 *         schema:
 *           type: string
 *           example: clx97v5fw0000ltr2tzuxqe5t
 *     responses:
 *       200:
 *         description: A single topic
 *       404:
 *         description: Topic not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /topic/{id}:
 *   put:
 *     summary: Update a topic by ID (moderator only)
 *     tags:
 *       - Topic
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the topic to update
 *         schema:
 *           type: string
 *           example: clx97v5fw0000ltr2tzuxqe5t
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Topic Name"
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Topic not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /topic/{id}:
 *   delete:
 *     summary: Delete a topic by ID (moderator only)
 *     tags:
 *       - Topic
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the topic to delete
 *         schema:
 *           type: string
 *           example: clx97v5fw0000ltr2tzuxqe5t
 *     responses:
 *       204:
 *         description: Topic deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Topic not found
 *       400:
 *         description: Bad request
 */
module.exports = router;
