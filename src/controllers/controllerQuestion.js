const { 
    createQuestion,
    findQuestionByTitle,
    findQuestionById
 } = require("../services/serviceQuestion");
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

const handleGetQuestion = async(req, res) => {
    try {
        const questionId = req.params.id;
        const question = await findQuestionById(questionId);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

module.exports = { 
    createQuestionController,
    handleGetQuestion
 };
