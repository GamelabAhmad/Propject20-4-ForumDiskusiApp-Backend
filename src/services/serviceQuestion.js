const cloudinary = require("../config/cloudinaryConfig");
const prisma = require("../db");

const createQuestion = async (userId, data, file, slugData) => {
  try {
    let imageUrl = null;

    // Upload image to Cloudinary if file exists
    if (file) {
      const response = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "questions",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = response.secure_url;
    }

    // Create question record in the database
    const question = await prisma.questions.create({
      data: {
        title: data.title,
        body: data.body,
        slug: slugData,
        imageUrl: imageUrl,
        forum: data.forumID ? { connect: { uuid: data.forumID } } : undefined,
        topic: data.topicsID ? { connect: { uuid: data.topicsID } } : undefined,
        createdBy: { connect: { uuid: userId }}
      },
    });

    return question;
  } catch (error) {
    throw new Error("Failed to create question: " + error.message);
  }
};

// Find Questions berdasarkan title
const findQuestionByTitle = async (title) => {
  const question = await prisma.questions.findUnique({
    where: {
      title: title,
    },
  });
  return question;
};

// Find question by id
const findQuestionById = async (questionId) => {
  const question = await prisma.questions.findUnique({
    where: {
      uuid: questionId,
    },
    include: {
      createdBy: true
    }
  });
  return question;
};

// All Question
const getQuestion = async() => {
  const question = await prisma.questions.findMany({
    include: {
      createdBy: true,
      QuestionLikes: true
    }
  });
  return question;
}
// Edit question
const editQuestion = async (questionId, data, file) => {
  try {
    let imageUrl = null;

    // Upload image to Cloudinary if file exists
    if (file) {
      const response = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "questions",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = response.secure_url;
    }

    const question = await prisma.questions.update({
      where: {
        uuid: questionId,
      },
      data: {
        title: data.title,
        body: data.body,
        slug: data.slug,
        imageUrl: imageUrl || undefined,
        forumID: data.forumID || null,
        topicsID: data.topicsID || null,
      },
    });

    return question;
  } catch (error) {
    throw new Error("Failed to edit question: " + error.message);
  }
};

// Delete question
const deleteQuestion = async (questionId) => {
  try {
    await prisma.questions.delete({
      where: {
        uuid: questionId,
      },
    });
    return { message: "Question deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete question: " + error.message);
  }
};

// Search questions by title
const searchQuestionsByTitle = async (title) => {
  const lowerCaseTitle = title.toLowerCase();
  const questions = await prisma.questions.findMany({
    where: {
      title: {
        contains: lowerCaseTitle,
      },
    },
  });
  return questions;
};

module.exports = {
  createQuestion,
  findQuestionByTitle,
  getQuestion,
  findQuestionById,
  editQuestion,
  deleteQuestion,
  searchQuestionsByTitle,
};
