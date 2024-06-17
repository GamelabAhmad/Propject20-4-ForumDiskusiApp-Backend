const express = require("express");
const router = express.Router();
const { auth, moderator } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");
const {
    handleCreateMembership,
    handleGetMemberships,
    handleGetMembershipById,
    handleDeleteMembership,
    handleCheckUserMembership,
    handleGetMembershipsByUser,
    handleGetMembershipsByForum,
    handleGetMembersByUser
} = require("../controllers/controllerMemberShip");

router.post("/member/:forumId", auth, handleCreateMembership);
router.get("/members", handleGetMemberships);
router.get("/member/:id", handleGetMembershipById);
router.delete("/member/:forumId", auth, handleDeleteMembership);
router.get("/membership/:forumId", handleCheckUserMembership);
router.get("/membersByForum/:forumId", handleGetMembershipsByForum);
router.get("/membersByUser", handleGetMembershipsByUser);
router.get("/membersByUser/:userId", handleGetMembersByUser);

/**
 * @swagger
 * /member/{forumId}:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a membership for a user in a forum
 *     tags:
 *       - Membership
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         description: ID of the forum to join
 *         schema:
 *           type: string
 *           example: clxhb1y310000mh44m3n1qurj
 *     responses:
 *       201:
 *         description: Membership created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all memberships
 *     tags:
 *       - Membership
 *     responses:
 *       200:
 *         description: List of all memberships
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /member/{id}:
 *   get:
 *     summary: Get a membership by ID
 *     tags:
 *       - Membership
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the membership
 *         schema:
 *           type: string
 *           example: member123
 *     responses:
 *       200:
 *         description: Membership details
 *       404:
 *         description: Membership not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /member/{forumId}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Delete a membership for a user in a forum
 *     tags:
 *       - Membership
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         description: ID of the forum to leave
 *         schema:
 *           type: string
 *           example: clxhb1y310000mh44m3n1qurj
 *     responses:
 *       200:
 *         description: Membership deleted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /membership/{forumId}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Check if a user is a member of a forum
 *     tags:
 *       - Membership
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         description: ID of the forum
 *         schema:
 *           type: string
 *           example: clxhb1y310000mh44m3n1qurj
 *     responses:
 *       200:
 *         description: User membership status
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /membersByForum/{forumId}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all memberships by forum ID
 *     tags:
 *       - Membership
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         description: ID of the forum
 *         schema:
 *           type: string
 *           example: clxhb1y310000mh44m3n1qurj
 *     responses:
 *       200:
 *         description: List of all memberships in the forum
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /membersByUser:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all memberships by the logged-in user
 *     tags:
 *       - Membership
 *     responses:
 *       200:
 *         description: List of all memberships for the user
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /membersByUser/{userId}:
 *   get:
 *     summary: Get all memberships by user ID
 *     tags:
 *       - Membership
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *           example: clxeeplv30001jtn56ufc80x1
 *     responses:
 *       200:
 *         description: List of all memberships for the user
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

module.exports = router;