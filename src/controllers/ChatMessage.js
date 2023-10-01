const ChatBot = require("../models/ChatBot");
const ChatMessage = require("../models/ChatMessage");
const EndUser = require("../models/EndUser");

exports.startConversation = async (req, res) => {
    try {
        const { chatbotId } = req.params;

        const endUser = await EndUser.findOne({ endUserId: chatbotId }).populate('endUserId');

        if (!endUser){
            return res.status(404).send({
                status: false,
                message: "End User does not exist"
            })
        }

        const data = {
            sender: endUser.endUserId.ownerId,
            receiver: endUser.email,
            messageInfo: {
                lastMessage: "Welcome to Dukkan"
            },
            chatbotId
        }

        await ChatMessage.create(data);

        return res.status(200).send({
            status: true,
            message: "Conversation Created"
        })

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.getAllMessageInConversation = async (req, res) => {
    try {
        const { chatbotId } = req.params;

        const allConversation = await ChatMessage.find({ chatbotId }).select("-updatedAt -createdAt");

        return res.status(200).send({
            status: true,
            allConversation
        })

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.getSpecificMessageInConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversation = await ChatMessage.findOne({ 'messageInfo.conversationId': conversationId });

        if (!conversation){
            return res.status(404).send({
                status: true,
                message: "Invalid conversation Id"
            })
        }

        return res.status(200).send({
            status: true,
            conversation
        })

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.updateConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        if (!req.body.message){
            return res.status(404).send({
                status: false,
                message: "Add some message before updating"
            })
        }

        const conversation = await ChatMessage.findOne({ 'messageInfo.conversationId': conversationId });

        if (!conversation){
            return res.status(404).send({
                status: false,
                message: "Invalid conversation Id"
            })
        }

        conversation.messageInfo.lastMessage = req.body.message;
        await conversation.save();

        return res.status(200).send({
            status: true,
            conversation
        })

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversation = await ChatMessage.findOne({ 'messageInfo.conversationId': conversationId });

        if (!conversation){
            return res.status(404).send({
                status: true,
                message: "Invalid conversation Id"
            })
        }

        await conversation.deleteOne();

        return res.status(200).send({
            status: true,
            message: "Deleted conversation"
        })

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}