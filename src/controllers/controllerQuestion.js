const { createQuestion } = require("../services/serviceQuestion");
const slug = require("slug");


const createQuestionController = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.image;
    const data = req.body;

    const slugData = slug(data.title);
    const question = await createQuestion(data, file, slugData);

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createQuestionController };
