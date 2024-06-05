const express = require("express");
const { imageUpload } = require("../controllers/controllerCloudinary");
const router = express.Router();

router.post("/upload", imageUpload);

module.exports = router;
