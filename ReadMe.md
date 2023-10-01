Open terminal then open Dukkan-BE and run npm start
and use all the api

check the database.js file, mongoDB url is connect to database and working in terminal

User:

create (POST) - http://localhost:4949/api/v1/user/createUser
    *ADD userId, email, age, gender*

getAllUser (GET) - http://localhost:4949/api/v1/user/getAllUsers
getSpecificUser (GET) - http://localhost:4949/api/v1/user/getUser/:userId
updateUserData (PATCH) - http://localhost:4949/api/v1/user/updateUser/:userId
deleteUserData (DELETE) - http://localhost:4949/api/v1/user/deleteUser/:userId

ChatBot:

createBot (POST) - http://localhost:4949/api/v1/chatbot/:userId/chatbots
getAllUserChatBots (GET) - http://localhost:4949/api/v1/chatbot/getUserBots/:userId/chatbots
getspecificChatBot (GET) - http://localhost:4949/api/v1/chatbot/userBot/:chatbotId
updateBotDetails (PATCH) - http://localhost:4949/api/v1/chatbot/updateBot/:chatbotId
deleteChatBot (DELETE) - http://localhost:4949/api/v1/chatbot/deleteBot/:chatbotId


Conversation:
*chatBotId is mongoId
*conversationId is specific chat message mongoId

startConversation (POST) - http://localhost:4949/api/v1/conversation/startConversation/:chatbotId/conversations
getAllConversation (GET) - http://localhost:4949/api/v1/conversation/getAllConversation/:chatbotId/conversations
getSingleConversation (GET) - http://localhost:4949/api/v1/conversation/getSingleConversation/:conversationId
updateConversation (PATCH) - http://localhost:4949/api/v1/conversation/updateConversation/:conversationId"
deleteConversation (DELETE) - http://localhost:4949/api/v1/conversation/deleteConversation/:conversationId

EndUser: 
*endUserId is same as chatBotId but in this api it only retreives endUser data

createEndUser - (POST) - http://localhost:4949/api/v1/endusers/registerEnduser
    *ADD name and email only*

getAllEndUser - (GET) - http://localhost:4949/api/v1/endusers/getAllEndusers
getSpecificEndUser - (GET) - http://localhost:4949/api/v1/endusers/getEnduser/:endUserId
updateEndUser - (PATCH) - http://localhost:4949/api/v1/endusers/updateEnduser/:endUserId
deleteEndUser - (DELETE) - http://localhost:4949/api/v1/endusers/deleteEnduser/:endUserId


*/ Search chatBots with their ownerId

*/ We can search by any words with same userId stored in chatBot ownerId /*
searchChatBots - (GET) - http://localhost:4949/api/v1/chatbot/searchChatBot/:userId

*/ ?page=1&pageSize=10 we can store number in frontend to retreive */
botsPagination - (GET) - "http://localhost:4949/api/v1/chatbot/getAllUserBots/:userId/chatbots?page=1&pageSize=10"