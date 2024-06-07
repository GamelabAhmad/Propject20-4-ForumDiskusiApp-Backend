const prisma = require("../db");

const addLikeToQuestion = async(data, userId) => {
    try {
        const like = await prisma.questionLikes.create({
            data: {
                question: { connect: { uuid: data.questionId }},
                user: { connect: { uuid: userId }}
            }
        })
        return like;
    } catch (error) {
        throw new Error(`Failed to like question: ${error.message}`);
    }
}

const removeLikeFromQuestion = async(data, userId) => {
    try {
        await prisma.questionLikes.deleteMany({
            where: {
                question: { connect: { uuid: data.questionId }},
                user: { connect: { uuid: userId }}
            }
        })
    } catch (error) {
        throw new Error(`Failed to unlike question: ${error.message}`);
    }
}

const getLikesForQuestion = async (questionId) => {
    try {
      const likes = await prisma.questionLikes.findMany({
        where: {
            question: questionId,
        },
        include: {
          user: true,
        },
      });
      return likes;
    } catch (error) {
      throw new Error(`Failed to get likes: ${error.message}`);
    }
  };

  module.exports = {
    addLikeToQuestion,
    removeLikeFromQuestion,
    getLikesForQuestion
  }
