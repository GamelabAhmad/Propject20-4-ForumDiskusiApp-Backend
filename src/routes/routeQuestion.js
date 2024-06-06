const express = require("express");
const { 
    createQuestionController,
    handleGetQuestion
 } = require("../controllers/controllerQuestion");
const { route } = require("./routeAuth");
const router = express.Router();

router.post("/questions", createQuestionController);
router.get("/question/:id", handleGetQuestion);

module.exports = router;