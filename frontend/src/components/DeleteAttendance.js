import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteAttendance(){
    const { id } = useParams();

    const [empNo, setEmpNo] = useState("");
    const [entryTime, setEntryTime] = useState("");
    const [exitTime, setExitTime,] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [workingHrs, setWorkingHrs] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/attendance/getAttDetId/${id}`).then((res) => {
            console.log("Hello world");
            setEmpNo(res.data.empNo);
            setEntryTime(res.data.entryTime);
            setExitTime(res.data.exitTime);
            setDate(res.data.date);
            setStatus(res.data.status);
            setWorkingHrs(res.data.workingHrs);
        }).catch((err) => {
            console.log(err.response.data);
        })
    }, []);

    function sendData(e) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/attendance/deleteAtt/${id}`).then(
            ()=>{
                alert("Attendance deleted")
            }
        ).catch((err)=>{
            alert(err);
        });
    }

    return(
        <div className="formStyle">
            <h1>Delete</h1>
            <form>
                <div className="mb-3">
                    <label for="empId" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="empId" value={empNo} disabled />
                </div>
                <div className="mb-3">
                    <label for="entTime" className="form-label">Entry Time</label>
                    <input type="text" className="form-control" id="entTime" value={entryTime} disabled/>
                </div>
                <div className="mb-3">
                    <label for="extTime" className="form-label">Exit Time</label>
                    <input type="text" className="form-control" id="extTime" value={exitTime} disabled/>
                </div>
                <div className="mb-3">
                    <label for="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" value={date} disabled/>
                </div>
                <div className="mb-3">
                    <label for="status" className="form-label">Status</label>
                    <input type="text" className="form-control" id="status" value={status} disabled/>
                </div>
                <div className="mb-3">
                    <label for="workHrs" className="form-label">Working Hours</label>
                    <input type="text" className="form-control" id="workHrs" value={workingHrs} disabled/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={sendData}>Delete</button>
            </form>
        </div>
    )
}