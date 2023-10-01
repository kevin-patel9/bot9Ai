const mongoose = require("mongoose");

const ChatMessagesSchema = new mongoose.Schema({
    sender: {
        type: String,
        index: true
    },
    receiver: {
        type: String,
        index: true
    },
    messageInfo: {
        lastMessage: {
            type: String
        },
        conversationId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatMessages",
            default: function () {
                return new mongoose.Types.ObjectId().toHexString();
            },
        },
    },
    chatbotId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatBot",
    }
}, { timestamps: true });

module.exports = mongoose.model("ChatMessages", ChatMessagesSchema);
