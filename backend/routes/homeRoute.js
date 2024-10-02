const express = require('express')
const router = express.Router()

//middleware for accessing home route
router.use((req, res, next) => {
    console.log('Accessing /home routes');
    next()
})

router.get('/', async (req , res) => {
    try{
        res.send('This is Homepage to display')
    } catch (error){
        console.error('Error rendering homePage' , error);
        // Send a 500 status and error message
        res.status(500).send('Error displaying the HomePage');
    }
})


module.exports = router