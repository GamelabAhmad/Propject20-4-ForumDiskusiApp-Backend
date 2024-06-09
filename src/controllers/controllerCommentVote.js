const {
    toggleCommentVote,
    getVotesForComment,
} = require("../services/serviceCommentVote");

const handleVoteComment = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.userToken;

        if (!data.commentId) {
            res.status(400).send({ error: "Comment ID is required" });
            return;
        }

        const result = await toggleCommentVote(data, userId, 'VOTE');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error handling vote comment:", error); // Tambahkan log ini
        res.status(404).send({ error: error.message });
    }
}

const handleDownvoteComment = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.userToken;

        if (!data.commentId) {
            res.status(400).send({ error: "Comment ID is required" });
            return;
        }

        const result = await toggleCommentVote(data, userId, 'DOWNVOTE');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error handling downvote comment:", error); // Tambahkan log ini
        res.status(404).send({ error: error.message });
    }
}

const handleGetCommentVotes = async (req, res) => {
    try {
        console.log("Request params:", req.params); // Tambahkan log ini
        const { commentId } = req.params;

        if (!commentId) {
            res.status(400).send({ error: "Comment ID is required" });
            return;
        }

        const votes = await getVotesForComment(commentId);
        res.status(200).json(votes);
    } catch (error) {
        console.error("Error getting comment votes:", error); // Tambahkan log ini
        res.status(404).send({ error: error.message });
    }
}

module.exports = {
    handleVoteComment,
    handleDownvoteComment,
    handleGetCommentVotes
}
