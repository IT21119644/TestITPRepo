const mongoose = require("mongoose");//to connect with MongoDB
const schema = mongoose.Schema;

//To add attributes to the student/ Like creating a student class
const attendanceSchema = new schema({
    empNo: {
        type: String,
        required: true // this is a backend validation like in HTML
    },
    timeI: {
        type: String
    },
    timeO: {
        type: String
    },
    entryTime: {
        type: String,
        required: true
    },
    exitTime: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status:{
        type: String
    },
    workingHrs:{
        type: String
    }
})

const attendaceDetails = mongoose.model("Attendance", attendanceSchema);
module.exports = attendaceDetails;