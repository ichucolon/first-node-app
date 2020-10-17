const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//require('dotenv').config() --- shorhand

const database_connection = process.env.MONGODB_URI

const db = () => {
    mongoose.connect(database_connection, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
}

module.exports = {
    db
}