const mongoose = require("mongoose");

const chatBotSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        index: true,
    },
    chatBotInUse: {
        type: Boolean, // if endUser is not connected
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("ChatBot", chatBotSchema);