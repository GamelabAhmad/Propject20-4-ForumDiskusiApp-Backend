// services/questionService.js

const cloudinary = require("../config/cloudinaryConfig");
const prisma = require("../db")

const createQuestion = async (data, file, slugData) => {
  try {
    // Upload image to Cloudinary
    const response = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "questions",
      allowed_formats: ["jpg", "jpeg", "png"],
    });

    // Create question record in the database
    const question = await prisma.questions.create({
      data: {
        title: data.title,
        body: data.body,
        slug: slugData,
        imageUrl: response.secure_url,
        forumID: data.forumID,
        topicsID: data.topicsID,
      },
    });

    return question;
  } catch (error) {
    throw new Error("Failed to create question");
  }
};

// Find Questions berdasarkan title
const findQuestionByTitle = async (title) => {
    const question = await prisma.questions.findUnique({
        where: {
            title: title,
        }
    })
    return question;
}

// Find question id
const findQuestionById = async (questionId) => {
    const question = await prisma.questions.findUnique({
        where: {
            uuid: questionId
        }
    })
    return question;
}

module.exports = { 
    createQuestion,
    findQuestionByTitle,
    findQuestionById
 };
