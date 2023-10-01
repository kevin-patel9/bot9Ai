const ChatBot = require("../models/ChatBot");
const EndUser = require("../models/EndUser");
const User = require("../models/User");

exports.endUserRegister = async(req, res) => {
    try{
        const { name, email} = req.body;

        const endUserExist = await EndUser.findOne({ email });

        if (endUserExist){
            return res.status(400).send({
                status: false,
                message: "EndUser exist"
            })
        }

        const allChatBot = await ChatBot.find({});

        let getMongoId = '';

        // if the extra bot is not in use
        for (let bot of allChatBot){
            if (!bot.chatBotInUse){
                getMongoId = bot._id;
                bot.chatBotInUse = true;
                await bot.save();
                break;
            } 
        }

        if (!getMongoId){
            // get random chatUser
            const count = await User.countDocuments();
            const randomIndex = Math.floor(Math.random() * count);
            const randomUser = await User.findOne().skip(randomIndex);

            // create new chatbot if not chatbot available
            const chatBotData = {
                ownerId: randomUser.userId,
                chatBotInUse: true
            }

            const newChatBot = await ChatBot.create(chatBotData);

            getMongoId = newChatBot._id;
        }
        
        const data = {
            name,
            email,
            endUserId: getMongoId
        }

        await EndUser.create(data);

        return res.status(200).send({
            status: true,
            message: "EndUser Registered"
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.getAllEndUser = async(req, res) => {
    try{
        const allEndUser = await EndUser.find({});

        return res.status(200).send({
            status: true,
            allEndUser
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.getSpecificEndUser = async(req, res) => {
    try{
        const endUser = await EndUser.findOne({ endUserId: req.params.endUserId });

        if (!endUser){
            return res.status(404).send({
                status: false,
                message: "EndUser does not exist"
            })
        }

        return res.status(200).send({
            status: true,
            endUser
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.updateEndUserDetails = async(req, res) => {
    try{
        const updateEndUser = await EndUser.findOne({ endUserId: req.params.endUserId });

        if (!updateEndUser){
            return res.status(404).send({
                status: false,
                message: "EndUser does not exist"
            })
        }

        return res.status(200).send({
            status: true,
            endUser: updateEndUser
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.deleteEndUser = async(req, res) => {
    try{
        const deleteEndUser = await EndUser.findOne({ endUserId: req.params.endUserId });

        if (!deleteEndUser){
            return res.status(404).send({
                status: false,
                message: "EndUser does not exist"
            })
        }

        const chatbot = await ChatBot.findById(req.params.endUserId);

        chatbot.chatBotInUse = false;
        
        await chatbot.save();
        await deleteEndUser.deleteOne();

        return res.status(200).send({
            status: true,
            message: "End user deleted"
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}