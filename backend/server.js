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
//for redirecting root path to /home
app.get('/' , (req, res) => {
    res.redirect('/home')
})
//for route imports
const homeRouter = require('./routes/homeRoute')
const servicesRouter = require('./routes/servicesRoute')
const bookingsRouter = require('./routes/bookingsRoute')
const socialsRouter = require('./routes/socialsRoute')
const adminRoute =require('./routes/adminRoute')

//for allocating each router to a specific url path
app.use('/home' , homeRouter)
app.use('/services' , servicesRouter)
app.use('/bookings' , bookingsRouter)
app.use('/socials' , socialsRouter)
app.use('/admin' , adminRoute)


//for starting the server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
