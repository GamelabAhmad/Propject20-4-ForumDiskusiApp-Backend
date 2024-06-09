const prisma = require("../db");

const followUser = async (userId, followId) => {
  const follow = await prisma.follows.create({
    data: {
      userId,
      followingId: followId,
    },
  });
  return follow;
};

const unfollowUser = async (userId, followId) => {
  const unfollow = await prisma.follows.deleteMany({
    where: {
      userId,
      followingId: followId,
    },
  });
  return unfollow;
};

const getFollowers = async (followingId) => {
  const followers = await prisma.follows.findMany({
    where: {
      followingId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return followers.map((follows) => follows.user.username);
};

const getFollowing = async (userId) => {
  const following = await prisma.follows.findMany({
    where: {
      userId,
    },
    include: {
      following: {
        select: {
          username: true,
        },
      },
    },
  });
  return following.map((follows) => follows.following.username);
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
