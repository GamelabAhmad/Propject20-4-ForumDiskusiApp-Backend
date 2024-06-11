const prisma = require("../db");

const followUser = async (userId, followId) => {
  const alreadyFollow = await prisma.follows.findFirst({
    where: {
      userId,
      followingId: followId,
    },
  });

  if (alreadyFollow) {
    return { status: 400, message: "You already follow the user" };
  } else {
    const follow = await prisma.follows.create({
      data: {
        userId,
        followingId: followId,
      },
    });
    return follow;
  }
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
          avatar: true,
        },
      },
    },
  });
  const user = followers.map((follows) => ({
    username: follows.user.username,
    avatar: follows.user.avatar,
  }));

  if (user.length === 0) {
    return "No followers";
  }

  return user;
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
          avatar: true,
        },
      },
    },
  });
  const user = following.map((follows) => ({
    username: follows.following.username,
    avatar: follows.following.avatar,
  }));
  if (user.length === 0) {
    return "No following";
  }
  return user;
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
