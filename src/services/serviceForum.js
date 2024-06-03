const prisma = require("../db")

// Create
const createForum = async(userId,  forumData, slugData) => {
    const forum = await prisma.forums.create({
        data: {
            name: forumData.name,
            slug : slugData,
            createdBy: { connect: { uuid: userId }}
        },
    });
    return forum;
}

// Find forum berdasarkan name
const findForumByName = async (name) => {
    const forum = await prisma.forums.findUnique({
        where: {
            name: name
        }
    })
    return forum;
}

// Find forum berdasarkan Id
const findForumById = async (forumId) => {
    const forum = await prisma.forums.findUnique({
        where: {
            uuid: forumId
        }
    })
    return forum;
}

// Edit forum
const editForum = async(forumId, forumData, slugData) => {
    const forum = await prisma.forums.update({
        where: {
            uuid: forumId,
        },
        data: {
            name: forumData.name,
            slug : slugData
        }
    })
    return forum;
};

// Get All Forum
const getForums = async() => {
    const forum = await prisma.forums.findMany({});
    return forum;
}

// Delete Forum
const deleteForum = async(forumId) => {
    const forum = await prisma.forums.delete({
        where:{
            uuid: forumId
        }
    })
}


module.exports = {
    createForum,
    findForumById,
    findForumByName,
    editForum,
    getForums,
    deleteForum
}