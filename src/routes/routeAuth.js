const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validation");
const { signUpSchema } = require("../controllers/controllerAuth");
const { handleSignUp, handleSignIn, handleCreateAdmin } = require("../controllers/controllerAuth");

router.post("/signup", validateRequest(signUpSchema), handleSignUp);
router.post("/signin", handleSignIn);
router.post("/create-admin", validateRequest(signUpSchema), handleCreateAdmin);

module.exports = router;
