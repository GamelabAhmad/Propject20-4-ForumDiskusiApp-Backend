const {
  createQuestion,
  findQuestionByTitle,
  getQuestion,
  findQuestionById,
  editQuestion,
  deleteQuestion,
  searchQuestionsByTitle,
  getQuestionsByUserId,
  getQuestionsByForumId,
  getQuestionsByTopicId,
} = require("../services/serviceQuestion");
const slug = require("slug");
const yup = require("yup");
const { findTopicByName, findTopicById } = require("../services/serviceTopic");

const createQuestionController = async (req, res) => {
  try {
    let file = null;
    if (req.files && req.files.image) {
      file = req.files.image;
    }
    const userId = req.user.userToken;
    const data = req.body;
    const topic = await findTopicByName(data.topic);
    let topicId = null;
    if (topic) {
      topicId = topic.uuid;
    }
    if (!topicId) return res.status(404).json({ message: "Topic not found" });
    const slugData = slug(data.title);
    const question = await createQuestion(
      userId,
      data,
      file,
      slugData,
      null,
      topicId
    );

    res.status(200).json({ message: "Question created successful", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuestionInForum = async (req, res) => {
  try {
    let file = null;
    if (req.files && req.files.image) {
      file = req.files.image;
    }
    const userId = req.user.userToken;
    const forumId = req.params.forumId;
    const data = req.body;
    const topic = await findTopicByName(data.topic);
    let topicId = null;
    if (topic) {
      topicId = topic.uuid;
    }
    if (!topicId) return res.status(404).json({ message: "Topic not found" });
    const slugData = slug(data.title);
    const question = await createQuestion(
      userId,
      data,
      file,
      slugData,
      forumId,
      topicId
    );

    res.status(200).json({ message: "Question created successful", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await findQuestionById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const handleGetQuestions = async (req, res) => {
  try {
    const questions = await getQuestion();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  return;
};

const handleEditQuestion = async (req, res) => {
  try {
    let file = null;
    if (req.files && req.files.image) {
      file = req.files.image;
    }
    const questionId = req.params.id;
    const data = req.body;
    
    // Check if the topic exists
    const topic = await findTopicByName(data.topic);
    let topicId = null;
    if (topic) {
      topicId = topic.uuid;
    }
    if (!topicId) {
      return res.status(404).json({ message: "Topic not found" });
    }
    
    const slugData = slug(data.title);

    const question = await editQuestion(questionId, data, file, slugData, topicId);

    res.status(200).json({ message: "Question edited successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const handleDeleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const result = await deleteQuestion(questionId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleSearchQuestions = async (req, res) => {
  try {
    const title = req.query.title;
    const questions = await searchQuestionsByTitle(title);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetQuestionsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from the token
    const questions = await getQuestionsByUserId(userId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetQuestionsByUser = async (req, res) => {
  try {
    const userId = req.user.userToken; // Extract userId from the token
    const questions = await getQuestionsByUserId(userId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetQuestionsByForumId = async (req, res) => {
  try {
    const forumId = req.params.forumId; // Extract userId from the token
    const questions = await getQuestionsByForumId(forumId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetQuestionsByTopicId = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const questions = await getQuestionsByTopicId(topicId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createValidationQuestion = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
  topic: yup.string().required(),
});
module.exports = {
  createQuestionController,
  handleGetQuestion,
  handleEditQuestion,
  handleDeleteQuestion,
  handleSearchQuestions,
  handleGetQuestions,
  handleGetQuestionsByUserId,
  handleGetQuestionsByUser,
  handleGetQuestionsByForumId,
  handleGetQuestionsByTopicId,
  createValidationQuestion,
  createQuestionInForum,
};
