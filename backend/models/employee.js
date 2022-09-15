const mongoose = require("mongoose");//to connect with MongoDB
const schema = mongoose.Schema;

//To add attributes to the student/ Like creating a student class
const employeeSchema = new schema({
    empNo:{
        type: String
    },
    name: {
        type: String,
        required: true // this is a backend validation like in HTML
    },
    skill: {
        type: String,
        required: true
    },
    score: {
        type: Number
    },
    category:{
        type: String
    }
})

const employee = mongoose.model("Employee", employeeSchema);
module.exports = employee;