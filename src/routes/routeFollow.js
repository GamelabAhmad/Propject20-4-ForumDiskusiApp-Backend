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

router.get("/followers", auth, handleGetFollowers);
router.get("/following", auth, handleGetFollowing);
module.exports = router;
