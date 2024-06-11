const { findUserById } = require("../services/serviceAuth");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../services/serviceFollow");

const handleFollowUser = async (req, res) => {
  try {
    const userId = req.user.userToken;
    const followId = req.params.id;
    const follow = await followUser(userId, followId);
    res.status(200).json({ message: "Follow Successfull", follow });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const handleUnfollowUser = async (req, res) => {
  try {
    const userId = req.user.userToken;
    const followId = req.params.id;
    const unfollow = await unfollowUser(userId, followId);
    res.status(200).json({ message: "Unfollow Successfull", unfollow });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const handleGetFollowing = async (req, res) => {
  try {
    const userId = req.params.id;
    const followers = await getFollowing(userId);
    if (!followers) return res.status(404).json("No Following");
    res.status(200).json(followers);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const handleGetFollowers = async (req, res) => {
  try {
    const userId = req.params.id;
    const followers = await getFollowers(userId);
    if (!followers) return res.status(404).json("No Follower");
    res.status(200).json(followers);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  handleFollowUser,
  handleUnfollowUser,
  handleGetFollowing,
  handleGetFollowers,
};
