const express = require("express");
const { json, urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

const user = require("./routes/User");
const chatBot = require("./routes/ChatBot");
const enduser = require("./routes/EndUser");
const chatMessage = require("./routes/ChatMessage");

app.use("/api/v1/user", user);
app.use("/api/v1/chatbot", chatBot);
app.use("/api/v1/endusers", enduser);
app.use("/api/v1/conversation", chatMessage);

module.exports = app;