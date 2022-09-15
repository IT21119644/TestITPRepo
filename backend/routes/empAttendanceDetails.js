const router = require("express").Router();
let empAttendance = require("../models/empAttendance");

//first param is used to call the file from the front end
//http://localhost:8070/student/add

// ----------------CREATE------------------------

//Data is embedded in the body of the request
router.route("/addAttendance").post((req, res) => {
    const empNo = req.body.empNo;
    const timeI = req.body.timeI;
    const timeO = req.body.timeO;
    const entryTime = req.body.entryTime;
    const exitTime = req.body.exitTime;
    const date = req.body.date;
    const status = req.body.status;
    const workingHrs = req.body.workingHrs;

    const newEmpAttDetails = new empAttendance({
        empNo,
        timeI,
        timeO,
        entryTime,
        exitTime,
        date,
        status,
        workingHrs
    })
    

    //condition - if successfully saved
    newEmpAttDetails.save().then(() => {
        //response ekak widiht ywnw json format eken front end ekt
        res.json("Attendance record added");
    }).catch((err) => {
        console.log("Hello world");
        console.log(err);//display in the terminal
        
    })
});


// ------------------READ---------------------------

//we usually get the student details using the get method
router.route("/getAttDet").get((req, res) => {
    empAttendance.find().then((empAtt) => {
        res.json(empAtt)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------READ using the date---------------------------
router.route("/getAttDetDate/:date").get((req, res) => {
    let date = req.params.date;

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
      }

    empAttendance.find({"date": convert(date)}).then((empAttDate) => {
        res.json(empAttDate)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------READ using the objectID---------------------------
router.route("/getAttDetId/:id").get((req, res) => {
    let id = req.params.id;

    empAttendance.findById(id).then((empAttDate) => {
        res.json(empAttDate)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------READ using the employee No---------------------------
router.route("/getAttDetEmpNo/:empNo").get((req, res) => {
    let empNo = req.params.empNo;

    empAttendance.find({"empNo": empNo}).then((empAttDate) => {
        res.json(empAttDate)
    }).catch((err) => {
        console.log(err);
    })
})


// ------------------UPDATE---------------------------
router.route("/updateAtt/:id").put(async (req, res) => {
    let id = req.params.id;
    //fetch all the pther daya in the URL body as well

    // const name = request.body.name;
    // const age = Number(request.body.age);
    // const gender = request.body.gender;

    const {empNo, entryTime, exitTime, date, status, workingHrs } = req.body; //De-structure

    const updateAttendance = {
        empNo,
        entryTime,
        exitTime,
        date,
        status,
        workingHrs
    }

    //waits until the previous is finished. Waits for the promise
    const update = await empAttendance.findByIdAndUpdate(id, updateAttendance).then(() => {
        res.status(200).send({ status: "Attendance updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating the data", error: err.message }); // send the response status and the error msg to the front end
    })
})
    

//     // const update = await student.findByIdAndUpdate(userID, updateStudent).then(()=>{
//     //     res.json("Updated successfully")
//     // }).catch((err)=>{
//     //     console.log(err);
//     // })


// ----------------DELETE------------------------
router.route("/deleteAtt/:id").delete(async (req, res) => {
    let eId = req.params.id;
    // console.log(empNumber);
    // let userName = req.params.name;

    await empAttendance.findByIdAndDelete(eId).then(() => {
        res.status(200).send({ status: "Employee deleted" })
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({ status: "Error with deleting Employee", error: err.message })
    })
})


// // ----------------Find a single student------------------------
// router.route("/get/:id").get(async (req, res) => {
//     let userId = req.params.id;
//     const user = await student.findById(userId)
//         .then((student) => {
//             res.status(200).send({ status: "User fetched", student })
//         }).catch((err) => {
//             console.log(err.message);
//             res.status(500).send({ status: "Error with get user", error: err.message });
//         })
// })

// const myPython = require("../index")
// router.get('/script', myPython.runningPython);

module.exports = router;
