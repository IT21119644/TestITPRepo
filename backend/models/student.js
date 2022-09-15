const mongoose = require("mongoose");//to connect with MongoDB
const schema = mongoose.Schema;

//To add attributes to the student/ Like creating a student class
const studentSchema = new schema({
    empNo:{
        type: String
    },
    name: {
        type: String,
        required: true // this is a backend validation like in HTML
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    imgname: {
        type: String
        // required: true
    }
})

const student = mongoose.model("Student", studentSchema);
module.exports = student;