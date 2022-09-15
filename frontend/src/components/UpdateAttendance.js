import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function UpdateAttendance() {
    // let [employees, setEmployee] = useState([]);
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

        axios.put(`http://localhost:8070/attendance/updateAtt/${id}`, { empNo: empNo, entryTime: entryTime, exitTime: exitTime, date: date, status: status, workingHrs: workingHrs }).then(() => {
            alert("Attendance Updated")
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div className="formStyle">
            <h1>Update</h1>
            <form>
                <div className="mb-3">
                    <label for="empId" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="empId" value={empNo} disabled />
                </div>
                <div className="mb-3">
                    <label for="entTime" className="form-label">Entry Time</label>
                    <input type="text" className="form-control" id="entTime" value={entryTime} onChange={(e) => {
                        setEntryTime(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label for="extTime" className="form-label">Exit Time</label>
                    <input type="text" className="form-control" id="extTime" value={exitTime} onChange={(e) => {
                        setExitTime(e.target.value)
                    }}/>
                </div>
                <div className="mb-3">
                    <label for="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" value={date} onChange={(e) => {
                        setDate(e.target.value)
                    }}/>
                </div>
                <div className="mb-3">
                    <label for="status" className="form-label">Status</label>
                    <input type="text" className="form-control" id="status" value={status} onChange={(e) => {
                        setStatus(e.target.value)
                    }}/>
                </div>
                <div className="mb-3">
                    <label for="workHrs" className="form-label">Working Hours</label>
                    <input type="text" className="form-control" id="workHrs" value={workingHrs} onChange={(e) => {
                        setWorkingHrs(e.target.value)
                    }}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={sendData}>Update</button>
            </form>
        </div>
    )
}