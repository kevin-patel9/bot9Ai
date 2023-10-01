const ChatBot = require("../models/ChatBot");
const User = require("../models/User");

exports.createChatBot = async(req, res) => {
    try{

        const { userId } = req.params;

        const userExist = await User.findOne({ userId });

        if (!userExist){
            return res.status(404).send({
                status: false,
                message: "User does not exist"
            })
        }

        const chatBotData = {
            ownerId: req.params.userId
        }
        await ChatBot.create(chatBotData);

        return res.status(200).send({
            status: true,
            message: "New chatbot created"
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.getUserChatBots = async(req, res) => {
    try{
        const { userId } = req.params;

        const userExist = await User.findOne({ userId });

        if (!userExist){
            return res.status(404).send({
                status: false,
                message: "User does not exist"
            })
        }

        const userChatBots = await ChatBot.find({ ownerId: userId });

        return res.status(200).send({
            status: true,
            userChatBots
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.getUserPaginationChatBots = async (req, res) => {
    try {
    const { userId } = req.params;
    const { page, pageSize } = req.query;

    const userExist = await User.findOne({ userId });

    if (!userExist) {
        return res.status(404).send({
        status: false,
        message: "User does not exist",
        });
    }

    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const userChatBots = await ChatBot.find({ ownerId: userId }).skip(offset).limit(limit);

    return res.status(200).send({
        status: true,
        userChatBots,
    });
    } catch (err) {
    return res.status(500).send({
        status: false,
        message: err.message,
    });
    }
};

exports.getSpecificChatBot = async(req, res) => {
    try{
        const { chatbotId } = req.params;
    
        const specificChatBot = await ChatBot.findById(chatbotId);
    
        if (!specificChatBot) {
            return res.status(404).json({
                success: false,
                message: "ChatBot not found by _id",
            });
        }

        return res.status(200).send({
            status: true,
            specificChatBot
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.updateBotDetails = async(req, res) => {
    try{
        const { chatbotId } = req.params;
    
        const updateBot = await ChatBot.findById(chatbotId);
    
        if (!updateBot) {
            return res.status(404).json({
                success: false,
                message: "ChatBot not found by _id",
            });
        }

        await updateBot.save();

        return res.status(200).send({
            status: true,
            updateBot
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.searchChatBot = async(req, res) => {
    try{
        const { userId } = req.params;

        const allChatBot = await ChatBot.find({});

        const filteredBots = 
                allChatBot.filter(ele => 
                    ele.ownerId.includes(userId) ||
                    ele.ownerId.includes(userId.toLowerCase()) ||
                    ele.ownerId.includes(userId.toUpperCase()) ||
                    ele.ownerId.includes(
                        userId.charAt(0).toUpperCase() + userId.slice(1)
                    )
            )

        return res.status(200).send({
            status: true,
            filteredBots
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.deleteChatBot = async(req, res) => {
    try{
        const { chatbotId } = req.params;
        
        const specificChatBot = await ChatBot.findById(chatbotId);

        if (!specificChatBot) {
            return res.status(404).json({
                success: false,
                message: "ChatBot not found by _id",
            });
        }

        await specificChatBot.deleteOne();

        return res.status(200).send({
            status: true,
            message: "Chatbot deleted"
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}