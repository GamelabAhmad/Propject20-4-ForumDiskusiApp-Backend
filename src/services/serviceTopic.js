const prisma = require("../db");

const createTopic = async (userId, topicData, slugData) => {
  const topic = await prisma.topics.create({
    data: {
      name: topicData.name,
      slug: slugData,
      createdBy: { connect: { uuid: userId } },
    },
  });
  return topic;
};

const editTopic = async (topicId, topicData, slugData) => {
  const topic = await prisma.topics.update({
    where: {
      uuid: topicId,
    },
    data: {
      name: topicData.name,
      slug: slugData,
    },
  });
  return topic;
};

const getTopics = async () => {
  const topics = await prisma.topics.findMany({});
  return topics;
};

const findTopicById = async (topicId) => {
  const topic = await prisma.topics.findUnique({
    where: {
      uuid: topicId,
    },
  });
  return topic;
};

const findTopicByName = async (name) => {
  const topic = await prisma.topics.findUnique({
    where: {
      name: name,
    },
  });
  return topic;
};

const deleteTopic = async (topicId) => {
  const topic = await prisma.topics.delete({
    where: {
      uuid: topicId,
    },
  });
};

module.exports = {
  createTopic,
  editTopic,
  getTopics,
  findTopicByName,
  findTopicById,
  deleteTopic,
};
