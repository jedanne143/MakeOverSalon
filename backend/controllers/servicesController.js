const Services = require ('../models/services.js')

//[CREATE] to add a service to the database
const createService = async (req,res) => {
    try{
        const {type, subtype, name, price, duration, description } = req.body
        const service = await Services.create({
            type: type,
            subtype: subtype,
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
        //get all notes from the database
        const services = await Services.find();
        //send it as a response 
        res.json({services : services});    
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
        res.json({ service : service });    
    } catch (error) {
        res.status(500).send(`Error fetching service id ${id} data from the database`);
    }
}


//[UPDATE] to edit an existing service from the database by id
const editService = async (req, res) => {
    try{
        const id = req.params.id
        //extract data from the body
        const {type, subtype, name, price, duration, description } = req.body
        //find and update note
        const service =await Services.findByIdAndUpdate(id,{
            type: type,
            subtype: subtype,
            name: name,
            price: price,
            duration:duration,
            description: description
        })
        console.log("Successfully edited a service")
        //send the updated note as a response
        const editedService = await Services.findById(id)
        res.json({service: editedService})
    } catch (err){
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message });
    }
}

//[DELETE] to delete a service from the database

const deleteService = async (req, res) => {
    try {
      const id = req.params.id;
      // Check if the service exists before attempting to delete
      const service = await Services.findById(id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      // Perform the deletion
      await Services.deleteOne({ _id: id });
      res.status(200).json({ success: `Service with id ${id} is deleted` });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ error: "An error occurred while deleting the service" });
    }
  };

module.exports = {
    createService,
    readServices,
    readService,
    editService,
    deleteService
}