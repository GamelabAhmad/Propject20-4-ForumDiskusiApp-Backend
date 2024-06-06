const express = require("express");
const { createQuestionController } = require("../controllers/controllerQuestion");
const router = express.Router();

router.post("/questions", createQuestionController);

module.exports = router;