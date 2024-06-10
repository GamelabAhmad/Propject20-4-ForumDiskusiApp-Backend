const {
    createMembership,
    getMemberships,
    getMembershipById,
    deleteMembership,
    checkUserMembership,
    getMembershipsByUser,
    getMembershipsByForum
} = require("../services/serviceMemberShip");


const handleCreateMembership = async (req, res) => {
    const { forumId } = req.params;
    const userId = req.user.userToken; // Asumsikan userId ada dalam req.user.userToken
    try {
      // Cek apakah user sudah menjadi member
      const isMember = await checkUserMembership(forumId, userId);
      if (isMember) {
        return res.status(400).json({ error: 'User is already a member of this forum' });
      }
  
      // Jika belum menjadi member, buat keanggotaan baru
      const membership = await createMembership(forumId, userId);
      res.status(201).json(membership);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const handleGetMemberships = async (req, res) => {
    try {
      const memberships = await getMemberships();
      res.status(200).json(memberships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const handleGetMembershipById = async (req, res) => {
    const { id } = req.params;
    try {
      const membership = await getMembershipById(id);
      if (!membership) {
        return res.status(404).json({ error: 'Membership not found' });
      }
      res.status(200).json(membership);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const handleDeleteMembership = async (req, res) => {
    const { forumId } = req.params;
    const userId = req.user.userToken; // Asumsikan userId ada dalam req.user.userToken
    try {
      const result = await deleteMembership(forumId, userId);
      if (result.count === 0) {
        return res.status(404).json({ error: 'Membership not found' });
      }
      res.status(200).json({ message: 'Membership deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const handleCheckUserMembership = async (req, res) => {
    const { forumId } = req.params;
    const userId = req.user.userToken; // Asumsikan userId ada dalam req.user.userToken
    try {
      const isMember = await checkUserMembership(forumId, userId);
      res.status(200).json({ isMember });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const handleGetMembershipsByForum = async (req, res) => {
    const { forumId } = req.params;
    try {
        const memberships = await getMembershipsByForum(forumId);
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleGetMembershipsByUser = async (req, res) => {
    const userId = req.user.userToken; // Asumsikan userId ada dalam req.user.userToken
    try {
        const memberships = await getMembershipsByUser(userId);
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleGetMembersByUser = async (req, res) => {
    const userId = req.params.userId; // Asumsikan userId ada dalam req.user.userToken
    try {
        const memberships = await getMembershipsByUser(userId);
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handleCreateMembership,
    handleGetMemberships,
    handleGetMembershipById,
    handleDeleteMembership,
    handleCheckUserMembership,
    handleGetMembershipsByUser,
    handleGetMembershipsByForum,
    handleGetMembersByUser
}