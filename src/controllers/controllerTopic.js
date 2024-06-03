const {
  createTopic,
  findTopicByName,
  getTopics,
  findTopicById,
  editTopic,
  deleteTopic,
} = require("../services/serviceTopic");
const slug = require("slug");
const yup = require("yup");

const handleCreateTopic = async (req, res) => {
  try {
    const userId = req.user.userToken;
    const topicData = req.body;

    const existingTopic = await findTopicByName(topicData.name);
    if (existingTopic) {
      return res.status(400).json({ error: "Topic already exist" });
    }

    const slugData = slug(topicData.name);
    const topic = await createTopic(userId, topicData, slugData);

    res
      .status(201)
      .json({ message: "Topic created successfully", topic: topic });

    return;
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  return;
};

const handleEditTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const topicData = req.body;
    const slugData = slug(topicData.name);

    const existingTopic = await findTopicByName(topicData.name);
    if (existingTopic) {
      return res.status(400).json({ error: "Topic already exist" });
    }

    const newTopic = await editTopic(topicId, topicData, slugData);

    res
      .status(201)
      .json({ message: "Topic updated seuccessfully", topic: newTopic });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const handleDeleteTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const topic = await findTopicById(topicId);

    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
    }

    await deleteTopic(topicId);
    res.status(200).send({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const handleGetTopics = async (req, res) => {
  try {
    const topics = await getTopics();
    res.status(200).json(topics);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  return;
};

const handleGetTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const topic = await findTopicById(topicId);
    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const createTopicSchema = yup.object().shape({
  name: yup.string().required("Topic is required"),
});
module.exports = {
  handleCreateTopic,
  handleEditTopic,
  handleGetTopics,
  handleGetTopic,
  handleDeleteTopic,
  createTopicSchema,
};
