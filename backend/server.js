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

const studentRouter = require("./routes/students.js");
app.use("/student", studentRouter);

const attendanceRouter = require("./routes/empAttendanceDetails.js");
app.use("/attendance", attendanceRouter);
//first param is used to call the file from the front end
//http://localhost:8070/student

// const songRoutes = require("./routes/songs");
// app.use("/api/songs", songRoutes)

// --------------PYTHON --------------------
app.get('/script', (req, res)=>{
    let spawn = require("child_process").spawn;

    console.log("HMMMMMMMMMHHHH");
    let data1;

    const pythonOne = spawn('python', ['./app.py'])
    pythonOne.stdout.on('data', function(data){
        console.log("SPAWNED");
        // data1 = data.toString();
        res.send(data.toString());
    })

    pythonOne.on('close', (code)=>{
        console.log("Code: ", code)
        res.send(data1);
    })
})

// --------------PYTHON --------------------

//load the application into the port
app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
})