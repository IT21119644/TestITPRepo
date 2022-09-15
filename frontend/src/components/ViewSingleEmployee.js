import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function ViewSingleEmployee(){
    const { empNo } = useParams();
    let [employees, setEmployee] = useState([]);

    useEffect(() => {
        const getAttendance = async () => {
            const { data: res } = await axios.get(`http://localhost:8070/attendance/getAttDetEmpNo/${empNo}`);
            setEmployee(res);
            console.log("Fetching...");
            console.log(employees);
        }
        getAttendance();
    }, [])

    return(
        <div className="mainBodyView">
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
                                {/* <td>
                                    <button type="button" className="btn btn-success" onClick={() => {
                                        window.location.replace(`/updateAttendance/${employee._id}`);
                                    }}>Update</button>
                                    <button type="button" className="btn btn-danger btnView" onClick={() => {
                                        window.location.replace(`/deleteAttendance/${employee._id}`);
                                    }}>Delete</button>
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}