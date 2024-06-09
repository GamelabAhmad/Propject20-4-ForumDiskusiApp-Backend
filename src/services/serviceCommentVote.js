const prisma = require("../db");

const toggleCommentVote = async (data, userId, role) => {
    try {
        // Cek apakah sudah ada vote atau downvote dari user ini
        const existingVote = await prisma.commentVotes.findFirst({
            where: {
                commentId: data.commentId,
                userId: userId
            }
        });

        if (existingVote) {
            if (existingVote.role === role) {
                // Jika vote/downvote sudah ada, hapus
                await prisma.commentVotes.deleteMany({
                    where: {
                        commentId: data.commentId,
                        userId: userId
                    }
                });
                return { message: `${role} removed` };
            } else {
                // Jika role berbeda, update role
                const updatedVote = await prisma.commentVotes.updateMany({
                    where: {
                        commentId: data.commentId,
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
            const vote = await prisma.commentVotes.create({
                data: {
                    comment: { connect: { uuid: data.commentId }},
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

const getVotesForComment = async (commentId) => {
    try {
      const votes = await prisma.commentVotes.findMany({
        where: {
            commentId: commentId,
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
    toggleCommentVote,
    getVotesForComment
}
