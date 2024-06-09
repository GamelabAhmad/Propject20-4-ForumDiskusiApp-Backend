const prisma = require("../db");

const toggleVote = async (data, userId, role) => {
    try {
        // Cek apakah sudah ada vote atau downvote dari user ini
        const existingVote = await prisma.questionVotes.findFirst({
            where: {
                questionId: data.questionId,
                userId: userId
            }
        });

        if (existingVote) {
            if (existingVote.role === role) {
                // Jika vote/downvote sudah ada, hapus
                await prisma.questionVotes.deleteMany({
                    where: {
                        questionId: data.questionId,
                        userId: userId
                    }
                });
                return { message: `${role} removed` };
            } else {
                // Jika role berbeda, update role
                const updatedVote = await prisma.questionVotes.updateMany({
                    where: {
                        questionId: data.questionId,
                        userId: userId
                    },
                    data: {
                        role: role
                    }
                });
                return updatedVote;
            }
        } else {
            // Jika belum ada vote/downvote, tambahkan
            const vote = await prisma.questionVotes.create({
                data: {
                    question: { connect: { uuid: data.questionId }},
                    user: { connect: { uuid: userId }},
                    role: role
                }
            });
            return vote;
        }
    } catch (error) {
        throw new Error(`Failed to toggle ${role.toLowerCase()}: ${error.message}`);
    }
}

const getVotesForQuestion = async (questionId) => {
    try {
      const votes = await prisma.questionVotes.findMany({
        where: {
            questionId: questionId,
        },
        include: {
          user: true,
        },
      });
      return votes;
    } catch (error) {
      throw new Error(`Failed to get votes: ${error.message}`);
    }
  };

module.exports = {
    toggleVote,
    getVotesForQuestion
}
