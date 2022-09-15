// this will be implemented as a functional component
import React, { useState } from "react";
import "../CompCSS/form.css";
import axios from "axios";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";

function AddStudent() {
    let [empNo, setEmpNo] = useState("");
    let [name, setName] = useState("");
    let [age, setAge] = useState("");
    let [gender, setGender] = useState("");
    let [filename, setFileName] = useState("");
    const [progress, setProgress] = useState(0);
    
    // function onChangeFile(e) {
    //     setFileName(e.target.files[0]);
    // }

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File: ", downloadURL);
                    console.log(typeof downloadURL);
                    setFileName(downloadURL);
                });
            }
        );
    };

    function sendData(e) {
        e.preventDefault(); //To prevent the default behaviour of a submit button
        // let imgname = filename.name;
        let imgname = filename;
        const newStudent = {
            empNo,
            name,
            age,
            gender,
            imgname
        }
        console.log(imgname);
        console.log(typeof name);


        axios.post("http://localhost:8070/student/add", newStudent).then(() => {
            alert("Student added");
        }).catch((err) => {
            alert(err);
            console.log(err);
            console.log("Error with sending form data");
        })

        // axios.post('http://localhost:8070/student/add', {
        //     data:formData,
        //     /* what is this ? If you want this to be on form data use formData.append('route', this.$route.params.test) */
        //       headers: {
        //         'content-type': 'multipart/form-data',
        //       }}).then(response => {
        //     console.log(response);
        //     console.log("Student added")
        //   }).catch((err) => {
        //         alert(err);
        //         console.log(err);
        //         console.log("Error with sending form data");
        //     })
    }

    return (
        //Here JSX is used. In JSX all elements should be closed
        <div className="formStyle">
            <form onSubmit={formHandler}>
                <input type="file" className="input" />
                <button type="submit">Upload</button>
            </form>
            <hr />
            <h2>Uploading done {progress}%</h2>

            <form encType="multipart/form-data" method="post"> 
                <div className="mb-3">
                    <label for="eno" className="form-label">EmpNo</label>
                    <input type="text" className="form-control" id="eno" onChange={(e) => {
                        setEmpNo(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => {
                        setName(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label for="age" className="form-label">Age</label>
                    <input type="text" className="form-control" id="age" onChange={(e) => {
                        setAge(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label for="gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" id="gender" onChange={(e) => {
                        setGender(e.target.value)
                    }} />
                </div>
                {/* <label className="form-label" htmlFor="file">Default file input example</label>
                <input type="file" className="form-control" id="customFile" name="file" onChange={onChangeFile} /><br /> */}

                <button type="submit" className="btn btn-primary" onClick={sendData}>Submit</button>
            </form>
        </div>
    )
}

export default AddStudent;

