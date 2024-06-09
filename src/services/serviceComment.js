const prisma = require("../db");

const createComent = async (userId, body, questionId) => {
  const comment = await prisma.comments.create({
    data: {
      body: body,
      question: { connect: { uuid: questionId } },
      commentedBy: { connect: { uuid: userId } },
    },
  });
  return comment;
};

const getComments = async () => {
  const comments = await prisma.comments.findMany({
    include: {
      commentedBy: {
        select: {
          username: true,
        },
      },
      question: true,
    },
  });
  return comments;
};

const getComment = async (commentId) => {
  const comment = await prisma.comments.findUnique({
    where: {
      uuid: commentId,
    },
    include: {
      commentedBy: {
        select: {
          username: true,
        },
      },
      question: true,
    },
  });
  return comment;
};

const deleteComment = async (commentId, userId) => {
  const findcomment = await prisma.comments.findUnique({
    where: {
      uuid: commentId,
    },
    select: {
      userId: true,
    },
  });

  if (findcomment.userId !== userId) {
    throw new Error("Access Denied");
  }

  const comment = await prisma.comments.delete({
    where: {
      uuid: commentId,
    },
  });
  return comment;
};

const editComment = async (commentId, userId, body) => {
  const findcomment = await prisma.comments.findUnique({
    where: {
      uuid: commentId,
    },
    select: {
      userId: true,
    },
  });

  if (findcomment.userId !== userId) {
    throw new Error("Access Denied");
  }

  const updateComment = await prisma.comments.update({
    where: {
      uuid: commentId,
    },
    data: {
      body: body,
    },
  });
  return updateComment;
};

const getCommentEachQuestion = async (questionId) => {
  const comment = await prisma.comments.findMany({
    where: {
      questionId: questionId,
    },
    include: {
      commentedBy: {
        select: {
          username: true,
        },
      },
      question: true,
    },
  });
  return comment;
};

module.exports = {
  createComent,
  getComments,
  getComment,
  deleteComment,
  editComment,
  getCommentEachQuestion,
};
