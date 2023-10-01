const mongoose = require("mongoose");

const endUserSchema = new mongoose.Schema({
    endUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatBot",
    },
    name: {
        type: String
    },
    email: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model("EndUser", endUserSchema);