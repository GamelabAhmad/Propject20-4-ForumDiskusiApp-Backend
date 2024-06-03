const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./src/routes/routeAuth");
const topicRoute = require("./src/routes/routeTopic");
const forumRoute = require("./src/routes/routeForum"); 

const prisma = PrismaClient;
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//auth route
app.use(authRoute);

//topic route
app.use(topicRoute);

// Forum Routes
app.use(forumRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
