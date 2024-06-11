const express = require("express");
const router = express.Router();
const { auth, moderator } = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");
const {
    handleCreateMembership,
    handleGetMemberships,
    handleGetMembershipById,
    handleDeleteMembership,
    handleCheckUserMembership,
    handleGetMembershipsByUser,
    handleGetMembershipsByForum,
    handleGetMembersByUser
} = require("../controllers/controllerMemberShip");

router.post("/member/:forumId", auth, handleCreateMembership);
router.get("/members", handleGetMemberships);
router.get("/member/:id", handleGetMembershipById);
router.delete("/member/:forumId", auth, handleDeleteMembership);
router.get("/membership/:forumId", auth, handleCheckUserMembership);
router.get("/membersByForum/:forumId", auth, handleGetMembershipsByForum);
router.get("/membersByUser", handleGetMembershipsByUser);
router.get("/membersByUser/:userId", handleGetMembersByUser);

module.exports = router;