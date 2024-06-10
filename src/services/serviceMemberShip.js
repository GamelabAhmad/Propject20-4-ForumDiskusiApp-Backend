const prisma = require("../db");
const { connect } = require("../routes/routeForum");

const createMembership = async (forumId, userId) => {
    return await prisma.membership.create({
      data: {
        Forum: {connect: {uuid: forumId}},
        User: { connect: {uuid: userId}},
      },
    });
  };

  const getMemberships = async () => {
    return await prisma.membership.findMany({
      include: {
        Forum: true,
        User: true,
      },
    });
  };
  
  const getMembershipById = async (id) => {
    return await prisma.membership.findUnique({
      where: { uuid: id },
      include: {
        Forum: true,
        User: true,
      },
    });
  };
  

  const deleteMembership = async (forumId, userId) => {
    return await prisma.membership.deleteMany({
      where: {
        forumId,
        userId,
      },
    });
  };

  const checkUserMembership = async (forumId, userId) => {
    const membership = await prisma.membership.findFirst({
      where: {
        forumId,
        userId,
      },
    });
    return membership !== null;
  };

  const getMembershipsByForum = async (forumId) => {
    return await prisma.membership.findMany({
        where: { forumId },
        include: {
            User: true,
        },
    });
};

const getMembershipsByUser = async (userId) => {
    return await prisma.membership.findMany({
        where: { userId },
        include: {
            Forum: true,
        },
    });
};

module.exports = {
    createMembership,
    getMemberships,
    getMembershipById,
    deleteMembership,
    checkUserMembership,
    getMembershipsByUser,
    getMembershipsByForum
}