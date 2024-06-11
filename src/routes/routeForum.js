const express = require("express");
const router = express.Router();
const { auth, moderator } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");
const {
  handleCreateForum,
  handleGetForum,
  handleGetForums,
  handleEditForum,
  handleDeleteForum,
  createValidationForum,
} = require("../controllers/controllerForums");

router.post(
  "/forum",
  auth,
  moderator,
  validateRequest(createValidationForum),
  handleCreateForum
);

router.get("/forums", handleGetForums);

router.get("/forum/:id", handleGetForum);

router.put("/forum/:id", auth, moderator, handleEditForum);

router.delete("/forum/:id", auth, moderator, handleDeleteForum);

/**
 * @swagger
 * /forum:
 *   post:
 *     summary: Create a forum (moderator only)
 *     tags:
 *       - Forum
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nama forum
 *               description:
 *                 type: string
 *                 example: Deskripsi forum
 *     responses:
 *       201:
 *         description: Forum created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /forums:
 *   get:
 *     summary: Get all forums
 *     tags:
 *       - Forum
 *     responses:
 *       200:
 *         description: List of forums
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /forum/{id}:
 *   get:
 *     summary: Get a forum by ID
 *     tags:
 *       - Forum
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the forum to get
 *         schema:
 *           type: string
 *           example: clx8i6zrd000011awqf8k9ecg
 *     responses:
 *       200:
 *         description: Forum found
 *       404:
 *         description: Forum not found
 */

/**
 * @swagger
 * /forum/{id}:
 *   put:
 *     summary: Update a forum by ID (moderator only)
 *     tags:
 *       - Forum
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the forum to update
 *         schema:
 *           type: string
 *           example: clx8i6zrd000011awqf8k9ecg
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nama forum updated"
 *               description:
 *                 type: string
 *                 example: "Deskripsi forum updated"
 *     responses:
 *       200:
 *         description: Forum updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Forum not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /forum/{id}:
 *   delete:
 *     summary: Delete a forum by ID (moderator only)
 *     tags:
 *       - Forum
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the forum to delete
 *         schema:
 *           type: string
 *           example: clx8i6zrd000011awqf8k9ecg
 *     responses:
 *       204:
 *         description: Forum deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Forum not found
 *       400:
 *         description: Bad request
 */
module.exports = router;
