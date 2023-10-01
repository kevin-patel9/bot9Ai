const express = require("express");
const { createChatBot, getUserChatBots, getSpecificChatBot, deleteChatBot, updateBotDetails, searchChatBot, getUserPaginationChatBots } = require("../controllers/ChatBot");

const router = express.Router();

router.post("/:userId/chatbots", createChatBot);
router.get("/getUserBots/:userId/chatbots", getUserChatBots);
router.get("/userBot/:chatbotId", getSpecificChatBot);
router.patch("/updateBot/:chatbotId", updateBotDetails);
router.delete("/deleteBot/:chatbotId", deleteChatBot);

// Search ChatBots
router.get("/searchChatBot/:userId", searchChatBot);

// Pagination Api to get all Bots
router.get(
    "/getAllUserBots/:userId/chatbots", 
    getUserPaginationChatBots
)


module.exports = router;