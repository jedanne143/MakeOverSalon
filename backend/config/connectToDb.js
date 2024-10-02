const mongoose = require('mongoose')
//for accessing connection string from env file
require('dotenv').config()

//for database connection
const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log('Connected to database')
    } catch (error) {
        console.error('Error connecting to database', error)
    }
}
module.exports = connectToDb
