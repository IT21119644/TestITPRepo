import React, { useState } from "react";
import axios from "axios";

export default function UpdateStudent() {
    let [Uname, setName] = useState("");
    let [Uage, setAge] = useState("");
    let [Ugender, setGender] = useState("");

    function sendData(e){
        e.preventDefault();

        axios.put(`http://localhost:8070/student/update/${Uname}`, {age: Uage, gender: Ugender}).then(()=>{
            alert("Student Updated")
        }).catch((err)=>{
            alert(err);
        })
    }

    return (
        <div className="formStyle">
            <form>
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
                <button type="submit" className="btn btn-primary" onClick={sendData}>Update</button>
            </form>
        </div>
    )
}