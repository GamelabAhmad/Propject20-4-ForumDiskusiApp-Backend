const {
    createForum,
    findForumByName,
    findForumById,
    getForums,
    editForum,
    deleteForum
} = require("../services/serviceForum");

const slug = require("slug");
const yup = require("yup");

const handleCreateForum = async (req, res) => {
    try {
      const userId = req.user.userToken;
      const forumData = req.body;
  
      const existingForum = await findForumByName(forumData.name);
      if (existingForum) {
        return res.status(400).json({ error: "Forum already exist" });
      }
  
      const slugData = slug(forumData.name);
      const forum = await createForum(userId, forumData, slugData);
  
      res
        .status(201)
        .json({ message: "Forum created successfully", forum: forum });
  
      return;
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    return;
};

const handleEditForum = async (req, res) => {
    try {
        const forumId = req.params.id;
        const forumData = req.body;
        const slugData = slug(forumData.name);

        const existingForum = await findForumByName(forumData.name);
        if (existingForum) {
            return res.status(400).json({ error: "Forum already exist" })
        }

        const newForum = await editForum(forumId, forumData, slugData);

        res.status(201).json({ message: "Forum updated successfully", forum: newForum});
    } catch (error){
        res.status(404).send({ error: error.message })
    }
}

// Delete forum
const handleDeleteForum = async(req, res) => {
    try {
       const forumId = req.params.id;
       const forum = await findForumById(forumId);
       
       if(!forum) {
        res.status(404).json({ message: "Forum is not found"})
       }

       await deleteForum(forumId);
       res.status(200).send({ message: "Forum deleted successfully "});
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const handleGetForums = async(req, res) => {
    try {
        const forums = await getForums();
        res.status(200).json(forums);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
    return;
};

const handleGetForum = async (req, res) => {
    try {
        const forumId = req.params.id;
        const forum = await findForumById(forumId);
        if(!forum) {
            res.status(404).json({ message: "Forum is not found"});
        }
        res.status(200).json(forum);
    } catch (error) {
        res.status(404).send({ error: error.message})
    }
}
const createValidationForum = yup.object().shape({
    name: yup.string().required("Name is required"),
});

module.exports = {
    handleCreateForum,
    handleEditForum,
    handleGetForums,
    handleGetForum,
    handleDeleteForum,
    createValidationForum
};