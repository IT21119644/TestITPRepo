import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function DeleteCheckList(){
    const { id } = useParams();
    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [date, setDate,] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/checkList/getCheckListId/${id}`).then((res) => {
            console.log("Hello world");
            setName(res.data.name);
            setScore(res.data.score);
            setDate(res.data.date);
        }).catch((err) => {
            console.log(err.response.data);
        })
    }, []);

    function sendData(e) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/checkList/deleteChkl/${id}`).then(
            ()=>{
                alert("CheckList deleted")
            }
        ).catch((err)=>{
            alert(err);
        });
    }

    return(
        <div className="formStyle formCls">
            <h1>Update CheckList</h1>
            <form>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} disabled/>
                </div>
                <div className="mb-3">
                    <label for="score" className="form-label">Score</label>
                    <input type="text" className="form-control" id="score" value={score} disabled />
                </div>
                <div className="mb-3">
                    <label for="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" value={date} disabled/>
                </div>
                <button type="submit" className="btn btn-danger" onClick={sendData}>Delete</button>
            </form>
        </div>
    )
}