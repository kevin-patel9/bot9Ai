const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose
    .connect("mongodb://0.0.0.0:27017").then(con=>console.log(`Database connnected: ${con.connection.host}`))
    .catch((err)=>console.log(err))
};
