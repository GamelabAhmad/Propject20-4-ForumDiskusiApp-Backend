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
  const comments = await prisma.comments.findMany({});
  return comments;
};

const getComment = async (commentId) => {
  const comment = await prisma.comments.findUnique({
    where: {
      uuid: commentId,
    },
  });
  return comment;
};

module.exports = {
  createComent,
  getComments,
  getComment,
};
