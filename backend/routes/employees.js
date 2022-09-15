const router = require("express").Router();
let employee = require("../models/employee");

// ----------------CREATE------------------------

//Data is embedded in the body of the request
router.route("/addEmployee").post((req, res) => {
    const empNo = req.body.empNo;
    const name = req.body.name;
    const skill = req.body.skill;
    const score = Number(req.body.score);
    const category = req.body.category;
    // const studentImage = req.file.filename;
    
    //Transfer data using POST method
    console.log("Name: " + name + " " + typeof name);
    // console.log("image: " + imgname + " " + typeof imgname);

    const newEmployee = new employee({
        empNo,
        name,
        skill,
        score,
        category
    })
    
    //condition - if successfully saved
    newEmployee.save().then(() => {
        //response ekak widiht ywnw json format eken front end ekt
        res.json("employee added");
    }).catch((err) => {
        console.log("Hello world");
        console.log(err);//display in the terminal
        
    })
});

// ------------------READ---------------------------

//we usually get the student details using the get method
router.route("/getEmployee").get((req, res) => {
    employee.find().then((employees) => {
        res.json(employees)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------READ using the employee Category---------------------------
router.route("/getEmployeeByCat/:category").get((req, res) => {
    let category = req.params.category;

    employee.find({"category": category}).then((empcat) => {
        res.json(empcat)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------READ using the ID---------------------------
router.route("/getEmployeeById/:id").get((req, res) => {
    let id = req.params.id;

    employee.findById(id).then((emp) => {
        res.json(emp)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------READ using the EmpNo---------------------------
router.route("/getEmployeeByempNo/:empNo").get((req, res) => {
    let empNo = req.params.empNo;

    employee.find({"empNo": empNo}).then((emp) => {
        res.json(emp)
    }).catch((err) => {
        console.log(err);
    })
})

// // ----------------DELETE------------------------
// router.route("/deleteEmp").delete(async (req, res) => {

//     await employee.f().then(() => {
//         res.status(200).send({ status: "employees deleted" })
//     }).catch((err) => {
//         console.log(err.message)
//         res.status(500).send({ status: "Error with deleting employees", error: err.message })
//     })
// })

// ------------------UPDATE By EmpNo---------------------------
router.route("/updateEmp/:empNo").put(async (req, res) => {
    let empNo = req.params.empNo;
    //fetch all the pther daya in the URL body as well

    const {skill, score, category } = req.body; //De-structure

    const updateEmployee = {
        empNo,
        skill,
        score,
        category
    }

    //waits until the previous is finished. Waits for the promise
    const update = await employee.findOneAndUpdate({"empNo": empNo}, updateEmployee).then(() => {
        res.status(200).send({ status: "CheckList updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating the data", error: err.message }); // send the response status and the error msg to the front end
    })
})


module.exports = router;