import React, { useState } from "react";
import axios from "axios";

//THis is a void function to delete a student
export default function DeleteStudent() {
    const [Uname, setName] = useState("");

    function sendData(e) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/student/delete/${Uname}`).then(
            ()=>{
                alert("Student deleted")
            }
        ).catch((err)=>{
            alert(err);
        });
    }
    return (
        <div className="formStyle">
            <form>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={sendData}>Delete</button>
            </form>
        </div>
    )
}