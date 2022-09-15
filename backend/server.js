const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


//const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;
/* When running the application, local computer can act as a server. If so use the port number 8070. If the application is hosted in a remote server, we can't ensure that we always get the port number 8070. There process.env.PORT specifies that get the available port at that time */

app.use(cors());
app.use(bodyParser.json());

//connecting the DB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
})

// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code. Same problem was with me but if you remove useCreateIndex, useFindAndModify

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB connection success!");
})

const checkListRouter = require("./routes/checkLists.js");
app.use("/checkList", checkListRouter);

const employeeRouter = require("./routes/employees.js");
app.use("/employee", employeeRouter);

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
})


//first param is used to call the file from the front end
//http://localhost:8070/student


