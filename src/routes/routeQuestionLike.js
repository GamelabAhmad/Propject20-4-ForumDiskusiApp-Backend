const express = require("express");
const {
    handleLikeQuestion,
    handleUnlikeQuestion,
    handleGetLikes
} = require("../controllers/controllerQuestionLike");

const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/like", auth, handleLikeQuestion);
router.post("/unlike", auth, handleUnlikeQuestion);
router.get("/likes/:questionId", handleGetLikes);

module.exports = router;