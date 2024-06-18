const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validation");
const { signUpSchema } = require("../controllers/controllerAuth");
const {
  handleSignUp,
  handleSignIn,
  handleCreateAdmin,
  handleGetUsers
} = require("../controllers/controllerAuth");

router.post("/signup", validateRequest(signUpSchema), handleSignUp);

router.post("/signin", handleSignIn);

router.post("/create-admin", validateRequest(signUpSchema), handleCreateAdmin);

router.get("/users", handleGetUsers);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: alixa
 *               password:
 *                 type: string
 *                 example: 12345678
 *               email:
 *                 type: string
 *                 example: alixa@gmail.com
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: alixa
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /create-admin:
 *   post:
 *     summary: Create a new admin
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin1234
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

module.exports = router;
