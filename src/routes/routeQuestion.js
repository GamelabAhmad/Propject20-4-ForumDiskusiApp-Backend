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
const { auth } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");

router.post("/questions", 
    auth,
    validateRequest(createValidationQuestion),
    createQuestionController
);
router.get("/question/:id", handleGetQuestion);
router.put("/question/:id", auth, handleEditQuestion);
router.delete("/question/:id", auth, handleDeleteQuestion);
router.get("/question", handleSearchQuestions);
router.get("/questions", handleGetQuestions)

module.exports = router;