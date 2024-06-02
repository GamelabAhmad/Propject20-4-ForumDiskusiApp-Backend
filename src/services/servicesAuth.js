const bcrypt = require("bcryptjs");
const prisma = require("../db");

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      name: null,
      bio: null,
      avatar: null,
    },
  });

  return user;
};

const findUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      uuid: userId,
    },
  });

  return user;
};

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findUserById,
};
