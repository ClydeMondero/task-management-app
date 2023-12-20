//access database url in the .env file
require('dotenv').config();
const db = process.env.DATABASE_URL;

const mongoose = require('mongoose');

//log if the the database is connected or not
const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
