const prisma = require("../db");

const editUser = async (username, newData) => {
  const user = await prisma.user.update({
    where: {
      username: username,
    },
    data: {
      name: newData.name,
      bio: newData.bio,
      avatar: newData.avatar,
    },
  });
  return user;
};

module.exports = {
  editUser,
};
