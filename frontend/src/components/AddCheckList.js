import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function AddCheckList(){
    let [name, setchklName] = useState("");
    let [score, setChklScore] = useState("");
    let [date, setChklDate] = useState("");

    function sendData(e) {
        e.preventDefault(); //To prevent the default behaviour of a submit button
        const newChkl = {
            name,
            score,
            date
        }

        axios.post("http://localhost:8070/checkList/addCheckList", newChkl).then(() => {
            alert("CheckList added");
        }).catch((err) => {
            alert(err);
            console.log(err);
            console.log("Error with sending form data");
        })
    }

    return(
        <div className="formStyle formCls">
            <form encType="multipart/form-data" method="post"> 
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => {
                        setchklName(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label for="score" className="form-label">Score</label>
                    <input type="text" className="form-control" id="score" onChange={(e) => {
                        setChklScore(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label for="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" onChange={(e) => {
                        setChklDate(e.target.value)
                    }} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={sendData}>Submit</button>
            </form>
        </div>
    )
}