import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import UpdateAttendance from "./UpdateAttendance";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"

export default function ViewDailyAttendance() {
    const [startDate, setStartDate] = useState(new Date());
    let [employees, setEmployee] = useState([]);
    const [empID, setEmpID] = useState("");

    function getAttendanceDetails() {
        const getAttendance = async () => {
            const { data: res } = await axios.get(`http://localhost:8070/attendance/getAttDetDate/${startDate}`);
            setEmployee(res);
            console.log(employees);
        }
        getAttendance();
    }

    function sendData(eid) {
        setEmpID(eid);
        // e.preventDefault();
        axios.delete(`http://localhost:8070/attendance/delete/${empID}`).then(
            ()=>{
                alert("Employee deleted")
            }
        ).catch((err)=>{
            alert(err);
        });
    }

    return (

        <div className="mainBodyView">
            <h3>View daily attendance</h3>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <button onClick={getAttendanceDetails} class="btn btn-primary generateBtn">Generate</button>
            <h4>{employees.length}</h4>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Emp No</th>
                        <th scope="col">Entry time</th>
                        <th scope="col">Exit time</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Working Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => {
                        return (
                            <tr>
                                <td>{employee.empNo}</td>
                                <td>{employee.entryTime}</td>
                                <td>{employee.exitTime}</td>
                                <td>{employee.date}</td>
                                <td>{employee.status}</td>
                                <td>{employee.workingHrs}</td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={() => {
                                        window.location.replace(`/updateAttendance/${employee._id}`);
                                    }}>Update</button>
                                    <button type="button" className="btn btn-danger btnView" onClick={() => {
                                        window.location.replace(`/deleteAttendance/${employee._id}`);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}