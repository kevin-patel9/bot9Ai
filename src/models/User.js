const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please enter user ID"],
        index: true
    },
    email: {
        type: String,
    },
    age: Number,
    gender: Number

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);