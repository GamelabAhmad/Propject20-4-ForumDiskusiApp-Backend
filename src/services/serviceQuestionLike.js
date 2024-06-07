const prisma = require("../db");

const addLikeToQuestion = async(data, userId) => {
    try {
        // Periksa apakah like sudah ada
        const existingLike = await prisma.questionLikes.findFirst({
            where: {
                questionId: data.questionId,
                userId: userId
            }
        });

        if (existingLike) {
            // Jika like sudah ada, hapus like
            await prisma.questionLikes.deleteMany({
                where: {
                    questionId: data.questionId,
                    userId: userId
                }
            });
            return { message: "Like removed" };
        } else {
            // Jika like belum ada, tambahkan like
            const like = await prisma.questionLikes.create({
                data: {
                    question: { connect: { uuid: data.questionId }},
                    user: { connect: { uuid: userId }}
                }
            });
            return like;
        }
    } catch (error) {
        throw new Error(`Failed to toggle like: ${error.message}`);
    }
}

const removeLikeFromQuestion = async(data, userId) => {
    try {
        await prisma.questionLikes.deleteMany({
            where: {
                questionId: data.questionId ,
                userId: userId 
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
            questionId: questionId,
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
