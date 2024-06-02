const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validation");
const { signUpSchema } = require("../controllers/controllerAuth");
const { handleSignUp, handleSignIn } = require("../controllers/controllerAuth");

router.post("/signup", validateRequest(signUpSchema), handleSignUp);
router.post("/signin", handleSignIn);

module.exports = router;
