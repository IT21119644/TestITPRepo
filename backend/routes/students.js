const router = require("express").Router();
let student = require("../models/student");

//first param is used to call the file from the front end
//http://localhost:8070/student/add

// ----------------CREATE------------------------

//Data is embedded in the body of the request
router.route("/add").post((req, res) => {
    const empNo = req.body.empNo;
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const imgname = req.body.imgname;
    // const studentImage = req.file.filename;
    
    //Transfer data using POST method
    console.log("Name: " + name + " " + typeof name);
    console.log("image: " + imgname + " " + typeof imgname);

    const newStudent = new student({
        empNo,
        name,
        age,
        gender,
        imgname
    })
    

    //condition - if successfully saved
    newStudent.save().then(() => {
        //response ekak widiht ywnw json format eken front end ekt
        res.json("Student added");
    }).catch((err) => {
        console.log("Hello world");
        console.log(err);//display in the terminal
        
    })
});


// ------------------READ---------------------------

//we usually get the student details using the get method
router.route("/").get((req, res) => {
    student.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------UPDATE---------------------------
router.route("/update/:name").put(async (req, res) => {
    let userName = req.params.name;
    //fetch all the pther daya in the URL body as well

    // const name = request.body.name;
    // const age = Number(request.body.age);
    // const gender = request.body.gender;

    const {age, gender } = req.body; //De-structure

    const updateStudent = {
        userName,
        age,
        gender
    }

    //waits until the previous is finished. Waits for the promise
    const update = await student.findOneAndUpdate({name: userName}, updateStudent).then(() => {
        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating the data", error: err.message }); // send the response status and the error msg to the front end
    })
})
    

    // const update = await student.findByIdAndUpdate(userID, updateStudent).then(()=>{
    //     res.json("Updated successfully")
    // }).catch((err)=>{
    //     console.log(err);
    // })


// ----------------DELETE------------------------
router.route("/delete/:name").delete(async (req, res) => {
    let userName = req.params.name;
    // let userName = req.params.name;

    await student.findOneAndDelete({name: userName}).then(() => {
        res.status(200).send({ status: "User deleted" })
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({ status: "Error with delete user", error: err.message })
    })
})


// ----------------Find a single student------------------------
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await student.findById(userId)
        .then((student) => {
            res.status(200).send({ status: "User fetched", student })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        })
})

const myPython = require("../index")
router.get('/script', myPython.runningPython);

module.exports = router;
