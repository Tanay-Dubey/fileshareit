require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true,useUnifiedTopology: true });
    console.log("Connected successfully to database");
}

module.exports = connectDB;