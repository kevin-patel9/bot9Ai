const express = require("express");
const { startConversation, getAllMessageInConversation, getSpecificMessageInConversation, updateConversation, deleteConversation } = require("../controllers/ChatMessage");

const router = express.Router();

router.post("/startConversation/:chatbotId/conversations", startConversation);
router.get("/getAllConversation/:chatbotId/conversations", getAllMessageInConversation);
router.get("/getSingleConversation/:conversationId", getSpecificMessageInConversation);
router.patch("/updateConversation/:conversationId", updateConversation);
router.delete("/deleteConversation/:conversationId", deleteConversation);

module.exports = router;