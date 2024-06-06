const prisma = require("../db");

const editUser = async (username, newData) => {
  const updateData = {
    name: newData.name,
    bio: newData.bio,
  };

  if (newData.avatar) {
    updateData.avatar = newData.avatar;
  }

  const user = await prisma.user.update({
    where: {
      username: username,
    },
    data: updateData,
  });
  return user;
};

module.exports = {
  editUser,
};
