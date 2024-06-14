const express = require("express");
const {
  handleFollowUser,
  handleUnfollowUser,
  handleGetFollowing,
  handleGetFollowers,
} = require("../controllers/controllerFollow");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/follow/:id", auth, handleFollowUser);
router.delete("/unfollow/:id", auth, handleUnfollowUser);

router.get("/followers/:id", handleGetFollowers);
router.get("/following/:id", handleGetFollowing);

/**
 * @swagger
 * /follow/{userId}:
 *   post:
 *     summary: Follow a user
 *     tags:
 *       - Follow
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to follow
 *         schema:
 *           type: string
 *           example: clx7pztiv00009klnalygklt0
 *     responses:
 *       200:
 *         description: Successfully followed user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /unfollow/{userId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Follow
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to unfollow
 *         schema:
 *           type: string
 *           example: clx7pztiv00009klnalygklt0
 *     responses:
 *       200:
 *         description: Successfully unfollowed user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /followers/{userId}:
 *   get:
 *     summary: Get followers of the user
 *     tags:
 *       - Follow
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user 
 *         schema:
 *           type: string
 *           example: clxeeow630000jtn5rrsnqav3
 *     responses:
 *       200:
 *         description: List of followers
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /following/{userId}:
 *   get:
 *     summary: Get folwing of the user
 *     tags:
 *       - Follow
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user 
 *         schema:
 *           type: string
 *           example: clxeeow630000jtn5rrsnqav3
 *     responses:
 *       200:
 *         description: List of following
 *       400:
 *         description: Bad request
 */
module.exports = router;
