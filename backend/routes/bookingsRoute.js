const express = require('express')
const router = express.Router()

//middleware for accessing home route
router.use((req, res, next) => {
    console.log('Accessing /bookings routes');
    next()
})


//[READ] route
router.get('/', async (req , res) => {
    try{
        res.send('This is BookingsPage to display')
    } catch (error){
        console.error('Error rendering BookingsPage' , error);
        // Send a 500 status and error message
        res.status(500).send('Error displaying the BookingsPage');
    }
})

module.exports = router