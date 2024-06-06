const express = require("express");
const {
    createQuestionController,
    handleGetQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSearchQuestions,
    handleGetQuestions
  } = require("../controllers/controllerQuestion");
const { route } = require("./routeAuth");
const router = express.Router();

router.post("/questions", createQuestionController);
router.get("/questions/:id", handleGetQuestion);
router.put("/questions/:id", handleEditQuestion);
router.delete("/questions/:id", handleDeleteQuestion);
router.get("/questions", handleSearchQuestions);
router.get("/questions", handleGetQuestions)

module.exports = router;