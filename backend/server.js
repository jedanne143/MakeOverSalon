//for creation of app server
const express = require('express')
const app =express()
//for accessing PORT from env file
require('dotenv').config()
const PORT = process.env.PORT || 3000
//for database connection
const connectToDb = require('./config/connectToDb')
connectToDb();

//for cross-origin access
const cors = require('cors');
//allow requests from frontend
app.use(cors()); 

//=========MIDDLEWARES==========
app.use(express.json());
const logMiddleware = (req, res, next) => {
    console.log(`Request [method: ${req.method}] [URL: ${req.url}]`)
    next()
}
app.use(logMiddleware)

//=========ROUTES=============
app.get('/' , (req, res) => {
    res.send('This is the root directory')
})
//for route imports
const servicesRouter = require('./routes/servicesRoute')
const bookingsRouter = require('./routes/bookingsRoute')

//for allocating each router to a specific url path
app.use('/services' , servicesRouter)
app.use('/bookings' , bookingsRouter)


//for starting the server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
