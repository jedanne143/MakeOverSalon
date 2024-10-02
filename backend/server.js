//for creation of app server
const express = require('express')
const app =express()
//for accessing PORT from env file
require('dotenv').config()
const PORT = process.env.PORT || 3000
//for database connection
const connectToDb = require('./config/connectToDb')
connectToDb();

//=========MIDDLEWARES==========
app.use(express.json());
app.use(express.static("public"));
const logMiddleware = (req, res, next) => {
    console.log(`Request [method: ${req.method}] [URL: ${req.url}]`)
    next()
}
app.use(logMiddleware)

//=========ROUTES=============



//for starting the server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
