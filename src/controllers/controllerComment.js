const slug = require("slug");
const {
  createComent,
  getComments,
  getComment,
  deleteComment,
  editComment,
  getCommentEachQuestion,
} = require("../services/serviceComment");
const { findQuestionById } = require("../services/serviceQuestion");

const handleCreateComment = async (req, res) => {
  try {
    const userId = req.user.userToken;
    const questionId = req.params.id;
    const question = await findQuestionById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    const { body } = req.body;

    const comment = await createComent(userId, body, questionId);
    res.status(201).json({ message: "Comment added successful", comment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleGetComments = async (req, res) => {
  try {
    const comments = await getComments();
    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleGetComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await getComment(commentId);
    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const handleDeleteComment = async (req, res) => {
  try {
    const userId = req.user.userToken;
    const commentId = req.params.id;
    await deleteComment(commentId, userId);
    res.status(200).json({ message: "Delete Successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleEditComment = async (req, res) => {
  try {
    const userId = req.user.userToken;
    const commentId = req.params.id;
    const { body } = req.body;

    const newComment = await editComment(commentId, userId, body);

    res.status(200).json({ message: "Update Successfull", newComment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const handleGetCommentEachQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await findQuestionById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    const comment = await getCommentEachQuestion(questionId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  handleCreateComment,
  handleGetComments,
  handleGetComment,
  handleDeleteComment,
  handleEditComment,
  handleGetCommentEachQuestion,
};
