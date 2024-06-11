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

<<<<<<< alixa/feat/follows
router.get("/followers/:id", handleGetFollowers);
router.get("/following/:id", handleGetFollowing);
=======
router.get("/followers", handleGetFollowers);
router.get("/following", handleGetFollowing);
>>>>>>> master

/**
 * @swagger
 * /follow/{id}:
 *   post:
 *     summary: Follow a user
 *     tags:
 *       - Follow
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 * /unfollow/{id}:
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Follow
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 * /followers:
 *   get:
 *     summary: Get followers of the authenticated user
 *     tags:
 *       - Follow
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of followers
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /following:
 *   get:
 *     summary: Get users followed by the authenticated user
 *     tags:
 *       - Follow
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of following users
 *       401:
 *         description: Unauthorized
 */
<<<<<<< alixa/feat/follows

=======
>>>>>>> master
module.exports = router;
