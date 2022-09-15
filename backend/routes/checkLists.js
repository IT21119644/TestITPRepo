const router = require("express").Router();
let checkList = require("../models/checkList");

// //first param is used to call the file from the front end
// //http://localhost:8070/student/add

// ----------------CREATE------------------------

//Data is embedded in the body of the request
router.route("/addCheckList").post((req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const score = Number(req.body.score);
    // const studentImage = req.file.filename;
    
    //Transfer data using POST method
    console.log("Name: " + name + " " + typeof name);
    // console.log("image: " + imgname + " " + typeof imgname);

    const newCheckList = new checkList({
        name,
        date,
        score
    })
    
    //condition - if successfully saved
    newCheckList.save().then(() => {
        //response ekak widiht ywnw json format eken front end ekt
        res.json("checkList added");
    }).catch((err) => {
        console.log("Hello world");
        console.log(err);//display in the terminal
        
    })
});


// // ------------------READ---------------------------

//we usually get the student details using the get method
router.route("/getCheckList").get((req, res) => {
    checkList.find().then((checkLists) => {
        res.json(checkLists)
    }).catch((err) => {
        console.log(err);
    })
})

// ------------------READ using the objectID---------------------------
router.route("/getCheckListId/:id").get((req, res) => {
    let id = req.params.id;

    checkList.findById(id).then((chkListId) => {
        res.json(chkListId)
    }).catch((err) => {
        console.log(err);
    })
})


// ------------------UPDATE---------------------------
router.route("/updateChkl/:id").put(async (req, res) => {
    let id = req.params.id;
    //fetch all the pther daya in the URL body as well

    const {name, score, date } = req.body; //De-structure

    const updateCheckList = {
        name,
        score,
        date
    }

    //waits until the previous is finished. Waits for the promise
    const update = await checkList.findByIdAndUpdate(id, updateCheckList).then(() => {
        res.status(200).send({ status: "CheckList updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating the data", error: err.message }); // send the response status and the error msg to the front end
    })
})

// ----------------DELETE------------------------
router.route("/deleteChkl/:id").delete(async (req, res) => {
    let id = req.params.id;

    await checkList.findByIdAndDelete(id).then(() => {
        res.status(200).send({ status: "CheckList deleted" })
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({ status: "Error with deleting checkList", error: err.message })
    })
})



// // ----------------DELETE------------------------
// router.route("/delete/:name").delete(async (req, res) => {
//     let userName = req.params.name;
//     // let userName = req.params.name;

//     await student.findOneAndDelete({name: userName}).then(() => {
//         res.status(200).send({ status: "User deleted" })
//     }).catch((err) => {
//         console.log(err.message)
//         res.status(500).send({ status: "Error with delete user", error: err.message })
//     })
// })


module.exports = router;
