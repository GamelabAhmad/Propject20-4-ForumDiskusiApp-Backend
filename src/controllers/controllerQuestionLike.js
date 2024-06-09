const {
    toggleVote,
    getVotesForQuestion,
} = require("../services/serviceQuestionLike");

const handleVoteQuestion = async (req, res) => {
    try {
        const data = { questionId: req.params.questionId }; // Extract questionId from params
        const userId = req.user.userToken;

        const result = await toggleVote(data, userId, 'VOTE');
        res.status(200).json(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

const handleDownvoteQuestion = async (req, res) => {
    try {
        const data = { questionId: req.params.questionId }; // Extract questionId from params
        const userId = req.user.userToken;

        const result = await toggleVote(data, userId, 'DOWNVOTE');
        res.status(200).json(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

const handleGetVotes = async (req, res) => {
    try {
        const { questionId } = req.params;

        if (!questionId) {
            res.status(400).send({ error: "Question ID is required" });
        }

        const votes = await getVotesForQuestion(questionId);
        res.status(200).json(votes);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

module.exports = {
    handleVoteQuestion,
    handleDownvoteQuestion,
    handleGetVotes
}
