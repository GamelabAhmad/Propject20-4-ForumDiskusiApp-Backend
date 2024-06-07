const { user } = require("../db");
const {
    addLikeToQuestion,
    removeLikeFromQuestion,
    getLikesForQuestion,
} = require("../services/serviceQuestionLike");


const handleLikeQuestion = async(req, res) => {
    try {
        const data = req.body;
        const userId = req.user.userToken;

        const like = await addLikeToQuestion(data, userId);
        res.status(200).json(like);
    } catch (error) {
       res.status(404).send({ error: error.message }) 
    }
}

const handleUnlikeQuestion = async(req, res) => {
    try {
        const data = req.body;
        const userId = req.user.userToken;

        await removeLikeFromQuestion(data, userId);
        res.status(200).json({ message: "Unlike the question" });
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const handleGetLikes = async(req, res) => {
    try {
        const { questionId } =req.params;

        if(!questionId) {
            res.status(400).send({ error: "Question ID is required" });
        }

        const likes = await getLikesForQuestion(questionId);
        res.status(200).json(likes);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

module.exports = {
    handleLikeQuestion,
    handleUnlikeQuestion,
    handleGetLikes
}