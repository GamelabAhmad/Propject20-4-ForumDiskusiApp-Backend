const express = require("express");
const {
    createQuestionController,
    handleGetQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSearchQuestions,
    handleGetQuestions,
    createValidationQuestion
  } = require("../controllers/controllerQuestion");
const router = express.Router();
const { auth, moderator } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");

router.post("/questions", 
    auth,
    validateRequest(createValidationQuestion),
    createQuestionController
);
router.get("/questions/:id", handleGetQuestion);
router.put("/questions/:id", handleEditQuestion);
router.delete("/questions/:id", handleDeleteQuestion);
router.get("/question", handleSearchQuestions);
router.get("/questions", handleGetQuestions)

module.exports = router;