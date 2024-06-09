const jwt = require("jsonwebtoken");
const { findUserById } = require("../services/serviceAuth");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

const moderator = async (req, res, next) => {
  const userId = req.user.userToken;
  const user = await findUserById(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "MODERATOR") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { auth, moderator };
