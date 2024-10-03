const express = require('express')
const router = express.Router()
//for importing controllers
const servicesController =require('../controllers/servicesController')

//middleware for accessing home route
router.use((req, res, next) => {
    console.log('Accessing /services routes');
    next()
})

//for importing data from models
const Services = require('../models/services')
//=====ROUTES======
//[CREATE] route
router.post('/add', servicesController.createService)
//[READ] route
router.post('/view' , servicesController.readService)
//[UPDATE] route 
router.put('/:id', servicesController.editService);

//[DELETE] route
router.delete('/:id', servicesController.deleteService )


module.exports = router