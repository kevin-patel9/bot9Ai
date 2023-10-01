const ChatBot = require("../models/ChatBot");
const EndUser = require("../models/EndUser");
const User = require("../models/User");

exports.createUser = async(req, res) => {
    try{

        const {userId, email, age, gender} = req.body;

        const userExist = await User.findOne({
            $or: [{ email }, { userId }],
        });
        
        if (userExist){
            return res.status(400).send({
                status: false,
                message: "Account Exist"
            })
        }

        const data = {
            userId,
            email,
            age,
            gender
        }

        const user = await User.create(data);

        const chatBotData = {
            ownerId: user.userId
        }
        await ChatBot.create(chatBotData);

        return res.status(200).send({
            status: true,
            message: "Account Created"
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.getAllUser = async(req, res) => {
    try{
        const allUser = await User.find({});

        return res.status(200).send({
            status: true,
            allUser
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.getSpecificUser = async(req, res) => {
    try{
        const { userId } = req.params;

        const getUser = await User.findOne({ userId });

        if (!getUser){
            return res.status(400).send({
                status: false,
                message: "User does not exist"
            })
        }

        return res.status(200).send({
            status: true,
            getUser
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.updateUserDetails = async(req, res) => {
    try{
        const { age, gender } = req.body;

        const updatedDetails = await User.findOne({ userId: req.params.userId });

        if (!updatedDetails){
            return res.status(404).send({
                status: true,
                message: "User does not exist"
            })
        }

        if (age){
            updatedDetails.age = age;
        }
        if (gender){
            updatedDetails.gender = gender;
        }

        await updatedDetails.save();

        return res.status(200).send({
            status: true,
            updatedDetails
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}

exports.deleteUser = async(req, res) => {
    try{
        const { userId } = req.params;

        const getUser = await User.findOne({ userId });

        if (!getUser){
            return res.status(400).send({
                status: false,
                message: "User does not exist"
            })
        }

        await getUser.deleteOne();

        // delete all chatBot related to User
        await ChatBot.deleteMany({
            ownerId: userId
        });

        // if there is a chat bot connected to enduser assign enduser new chatbot
        const allEndUser = await EndUser.find({});

        for (let endUser of allEndUser){
            const chatBoxExist = await ChatBot.findById(endUser.endUserId);
            if (!chatBoxExist){
                const count = await User.countDocuments();
                const randomIndex = Math.floor(Math.random() * count);
                const randomUser = await User.findOne().skip(randomIndex);

                // create new chatbot if not chatbot available
                const chatBotData = {
                    ownerId: randomUser.userId,
                    chatBotInUse: true
                }

                await ChatBot.create(chatBotData);
            }
        }

        return res.status(200).send({
            status: true,
            message: "User deleted"
        })

    }catch(err){
        return res.status(200).send({
            status: true,
            message: err.message
        })
    }
}