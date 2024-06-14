const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  handleGetUser,
  handleEditUser,
  handleGetLoggedInUserProfile,
  handleEditLoggedInUserProfile
} = require("../controllers/controllerUser");

router.get("/profile/:id", handleGetUser);

router.put("/setting/:id", auth, handleEditUser);

// profile user yang login
router.get("/profile", auth, handleGetLoggedInUserProfile);
// edit profile user yang login
router.put("/setting", auth, handleEditLoggedInUserProfile);

/**
 * @swagger
 * /profile/{username}:
 *   get:
 *     summary: Get a user by username
 *     tags:
 *       - User Profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to get
 *         schema:
 *           type: string
 *           example: alixa
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /setting/{username}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update a user by Username
 *     tags:
 *       - User Profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to update
 *         schema:
 *           type: string
 *           example: alixa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Name"
 *               bio:
 *                 type: string
 *                 example: "New Bio"
 *               image:
 *                 type: string
 *                 example: "http://example.com/new_image.jpg"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get logged in user profile
 *     tags:
 *       - User Profile
 *     responses:
 *       200:
 *         description: User found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /setting:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update logged user
 *     tags:
 *       - User Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Name"
 *               bio:
 *                 type: string
 *                 example: "New Bio"
 *               image:
 *                 type: string
 *                 example: "http://example.com/new_image.jpg"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

module.exports = router;
