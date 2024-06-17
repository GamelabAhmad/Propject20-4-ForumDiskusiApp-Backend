const cloudinary = require("../config/cloudinaryConfig");
const prisma = require("../db");

const createQuestion = async (
  userId,
  data,
  file,
  slugData,
  forumId = null,
  topicId
) => {
  try {
    let imageUrl = "";

    // Upload image to Cloudinary if file exists
    if (file) {
      const response = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "questions",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = response.secure_url;
    }

    const questionData = {
      title: data.title,
      body: data.body,
      slug: slugData,
      imageUrl: imageUrl,
      topic: { connect: { uuid: topicId } },
      createdBy: { connect: { uuid: userId } },
    };
    if (forumId) {
      questionData.forum = { connect: { uuid: forumId } };
    } else if (data.forumId) {
      questionData.forum = { connect: { uuid: data.forumId } };
    }

    // Create question record in the database
    const question = await prisma.questions.create({
      include:{
        topic:true,
      },
      data: questionData,
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
    include: {
      createdBy: true,
      topic:true,
      QuestionVotes: true,
      forum: true
    },

  });
  return question;
};

const editQuestion = async (questionId, data, file, slugData, topicId) => {
  try {
    // Fetch the existing question data
    const existingQuestion = await prisma.questions.findUnique({
      where: {
        uuid: questionId,
      },
      include: {
        topic: true,
      },
    });

    if (!existingQuestion) {
      throw new Error("Question not found");
    }

    let imageUrl = existingQuestion.imageUrl;

    // Upload image to Cloudinary if a new file is provided
    if (file) {
      const response = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "questions",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = response.secure_url;
    }

    const updatedData = {
      title: data.title || existingQuestion.title,
      body: data.body || existingQuestion.body,
      slug: slugData || existingQuestion.slug,
      imageUrl: imageUrl,
      topic: { connect: { uuid: topicId || existingQuestion.topic.uuid } },
    };

    const question = await prisma.questions.update({
      where: {
        uuid: questionId,
      },
      data: updatedData,
    });

    return question;
  } catch (error) {
    throw new Error("Failed to edit question: " + error.message);
  }
};
// Find question by id
const findQuestionById = async (questionId) => {
  const question = await prisma.questions.findUnique({
    where: {
      uuid: questionId,
    },
    include: {
      createdBy: true,
      topic:true,
      QuestionVotes: true,
      forum: true
    },
  });
  return question;
};

// All Question
const getQuestion = async () => {
  const question = await prisma.questions.findMany({
    include: {
      createdBy: true,
      topic:true,
      QuestionVotes: true,
      forum: true
    },
  });
  return question;
};
// Edit question

// Delete question
const deleteQuestion = async (questionId) => {
  try {
    await prisma.commentVotes.deleteMany({
      where: {
        comment: {
          questionId: questionId,
        },
      },
    });
    await prisma.comments.deleteMany({
      where: {
        questionId: questionId
      }
    })
    await prisma.questionVotes.deleteMany({
      where: {
        questionId: questionId,
      },
    });
    const question = await prisma.questions.delete({
      where: {
        uuid: questionId,
      },
    });
    return { message: "Question deleted successfully", question };
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

// Get question by user
const getQuestionsByUserId = async (userId) => {
  try {
    const questions = await prisma.questions.findMany({
      where: {
        createdBy: {
          uuid: userId,
        },
      },
      include: {
        createdBy: true,
        topic: true,
        forum: true,
        QuestionVotes: true,
      },
    });
    return questions;
  } catch (error) {
    throw new Error("Failed to get questions for the user: " + error.message);
  }
};

// Get question by forum
const getQuestionsByForumId = async (forumId) => {
  try {
    const questions = await prisma.questions.findMany({
      where: {
        forum: {
          uuid: forumId,
        },
      },
      include: {
        createdBy: true,
        topic: true,
        QuestionVotes: true,
        forum:true
      },
    });
    return questions;
  } catch (error) {
    throw new Error("Failed to get questions for the user: " + error.message);
  }
};

// Get question by topic
const getQuestionsByTopicId = async (topicId) => {
  try {
    const questions = await prisma.questions.findMany({
      where: {
        topic: {
          uuid: topicId,
        },
      },
      include: {
        createdBy: true,
        topic: true,
        QuestionVotes: true,
      },
    });
    return questions;
  } catch (error) {
    console.error("Error fetching questions: ", error); // Debug log
    throw new Error("Failed to get questions for the topic: " + error.message);
  }
};

module.exports = {
  createQuestion,
  findQuestionByTitle,
  getQuestion,
  findQuestionById,
  editQuestion,
  deleteQuestion,
  searchQuestionsByTitle,
  getQuestionsByUserId,
  getQuestionsByForumId,
  getQuestionsByTopicId,
};
