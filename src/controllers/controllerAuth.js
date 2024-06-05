const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const yup = require("yup");
const {
  findUserByUsername,
  findUserByEmail,
  createUser,
} = require("../services/servicesAuth");

const handleSignUp = async (req, res) => {
  try {
    const newUserData = req.body;

    const existingUserByUsername = await findUserByUsername(
      newUserData.username
    );
    if (existingUserByUsername)
      return res.status(400).json({ error: "Username already exists" });

    const existingUserByEmail = await findUserByEmail(newUserData.email);
    if (existingUserByEmail)
      return res.status(400).json({ error: "Email alreadt exists" });

    const newUser = await createUser(newUserData);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  return;
};

const handleSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw Error("Invalid username or password");
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  return;
};

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .matches(/^[^\s]*$/, "Username must not contain spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address")
    .matches(/^[^\s]*$/, "Email must not contain spaces"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/^[^\s]*$/, "Password must not contain spaces"),
  name: yup.string().max(50, "Name must be at most 50 characters long"),
  bio: yup.string().max(200, "Bio must be at most 200 characters long"),
});

module.exports = {
  handleSignIn,
  handleSignUp,
  signUpSchema,
};
