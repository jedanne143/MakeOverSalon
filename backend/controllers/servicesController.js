const Services = require ('../models/services.js')

//[CREATE] to add a service to the database
const createService = async (req,res) => {
    try{
        const {type, name, price, duration, description } = req.body
        const service = await Services.create({
            type: type,
            name: name,
            price: price,
            duration: duration,
            description: description
        })
        console.log("Successfully added a service")
        res.json({ service: service})
    } catch (error){
            //for handling Mongoose validation errors
            res.status(400).json({ error: err.message });
    }
}

//[READ] to read all services available
const readServices = async (req, res) => {
    try {
        const services = await Services.find(); 
        res.json(services);    
    } catch (error) {
        res.status(500).send('Error fetching services data from the database');
    }
}

//[READ] to read a service from the database by id
const readService = async (req, res) => {
    try {
        const id = req.params.id
        const service = await Services.findById(id)
        // Send the data as JSON in the response 
        res.json({service:service});    
    } catch (error) {
        res.status(500).send('Error fetching services data from the database');
    }
}


//[UPDATE] to edit an existing service from the database by id
const editService = async (req, res) => {
    try{
        const id = req.params.id
        const {type, name, price, duration, description } = req.body
        const service =await Services.findByIdAndUpdate(id,{
            type: type,
            name: name,
            price: price,
            duration:duration,
            description: description
        })
        console.log("Successfully edited a service")
        const updatedService = await Services.findById(id)
        res.json({service: service})
    } catch (err){
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message });
    }
}

//[DELETE] to delete a service from the database
const deleteService = async (req, res) => {
    const id = req.params.id
    await Services.deleteOne({
        _id : id
    })
    res.json({success: `${id} deleted`})
}

module.exports = {
    createService,
    readServices,
    readService,
    editService,
    deleteService
}