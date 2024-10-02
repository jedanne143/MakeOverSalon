const express = require('express')
const router = express.Router()

//middleware for accessing home route
router.use((req, res, next) => {
    console.log('Accessing /services routes');
    next()
})

router.get('/', async (req , res) => {
    try{
        res.send('This is the ServicesPage to display')
    } catch (error){
        console.error('Error rendering ServicesPage' , error);
        // Send a 500 status and error message
        res.status(500).send('Error displaying the ServicesPage');
    }
})


module.exports = router