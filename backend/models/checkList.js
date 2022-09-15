const mongoose = require("mongoose");//to connect with MongoDB
const schema = mongoose.Schema;

//To add attributes to the student/ Like creating a student class
const checkListSchema = new schema({
    name: {
        type: String,
        required: true // this is a backend validation like in HTML
    },
    date: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

const checkList = mongoose.model("CheckList", checkListSchema);
module.exports = checkList;