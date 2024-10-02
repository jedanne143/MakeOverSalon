const Services = require ('../models/services.js')

//[CREATE] to add a service to the database
const createService = async (req,res) => {
    try{
        const {type, name, price, note } = req.body
        const service = await Services.create({
            type: type,
            name: name,
            price: price,
            note: note
        })
        console.log("Successfully added a service")
        res.json({ service: service})
    } catch (error){
            //for handling Mongoose validation errors
            res.status(400).json({ error: err.message });
    }
}
//[UPDATE] to edit an existing service from the database by id
const editService = async (req, res) => {
    try{
        const id = req.params.id
        const {type, name, price, note } = req.body
        const service =await Services.findByIdAndUpdate(id,{
            type: type,
            name: name,
            price: price,
            note: note
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
    editService,
    deleteService
}