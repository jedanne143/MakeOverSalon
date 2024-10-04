const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    type: { 
        type: String, 
        //validation with custom error message
        required: [true, 'Service type input is required']
    },
    name: { 
        type: String, 
        //validation with custom error message
        required: [true, 'Service name input is required!'] 
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number']
    },
    //optional duration field
    duration :String,
    //optional notes field
    description: String
})

//for creating the model
const Services = mongoose.model("Services" , serviceSchema)

module.exports = Services