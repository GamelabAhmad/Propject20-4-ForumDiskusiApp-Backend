const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");
const {
  handleCreateTopic,
  handleGetTopics,
  handleGetTopic,
  handleEditTopic,
  handleDeleteTopic,
  createTopicSchema,
} = require("../controllers/controllerTopic");

router.post(
  "/topic",
  auth,
  validateRequest(createTopicSchema),
  handleCreateTopic
);
router.get("/topics", handleGetTopics);
router.get("/topic/:id", handleGetTopic);
router.put("/topic/:id", auth, handleEditTopic);
router.delete("/topic/:id", auth, handleDeleteTopic);

module.exports = router;
