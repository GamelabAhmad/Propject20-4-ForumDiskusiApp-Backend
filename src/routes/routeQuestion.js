const express = require("express");
const {
  createQuestionController,
  handleGetQuestion,
  handleEditQuestion,
  handleDeleteQuestion,
  handleSearchQuestions,
  handleGetQuestions,
  handleGetQuestionsByUser,
  handleGetQuestionsByUserId,
  handleGetQuestionsByForumId,
  handleGetQuestionsByTopicId,
  createValidationQuestion,
} = require("../controllers/controllerQuestion");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");

router.post(
  "/question",
  auth,
  validateRequest(createValidationQuestion),
  createQuestionController
);
router.get("/question/:id", handleGetQuestion);
router.put("/question/:id", auth, handleEditQuestion);
router.delete("/question/:id", auth, handleDeleteQuestion);
router.get("/question", handleSearchQuestions);
router.get("/questions", handleGetQuestions);
router.get("/questionByUser", auth, handleGetQuestionsByUser);
router.get("/questionByUser/:userId", auth, handleGetQuestionsByUserId);
router.get("/questionsByForum/:forumId", auth, handleGetQuestionsByForumId);
router.get("/questionsByTopic/:topicId", handleGetQuestionsByTopicId);

module.exports = router;
