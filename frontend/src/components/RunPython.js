import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
// import Papa from 'papaparse';
// import csvFile from "../attendance.csv";


// import {PythonShell} from 'python-shell';

export default function RunPython() {
    let [employees, setEmployee] = useState([]);
    const [empNo, setEmpNo] = useState("");

    let today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    function httpGetIn() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://localhost:8070/script"); // false for synchronous request
        xmlHttp.send(null);

        xmlHttp.onreadystatechange = (e) => {
            console.log(xmlHttp.responseText)
        }
        // return xmlHttp.responseText;
    }

    // function getData() {
    //     Papa.parse(csvFile, {
    //         header: true,
    //         // delimiter: ",",
    //         download: true,
    //         transformHeader: h => h.trim().replace(/"/g, ''),
    //         complete: function (results) {
    //             console.log(results.data);
    //             setEmployee(results.data);
    //             // for (let i = 0; i < results.data.length; i++) {
    //             //     values.push(results.data[i]);
    //             // }
    //             // console.log(values);
    //         }
    //     });
    // }

    useEffect(() => {
        const getAttendance = async () => {
            const { data: res } = await axios.get(`http://localhost:8070/attendance/getAttDetDate/${today}`);
            setEmployee(res);
            console.log("Fetching...");
            console.log(employees);
        }
        getAttendance();
    }, [])


    // function sendData(eid) {
    //     setEmpID(eid);
    //     // e.preventDefault();
    //     axios.delete(`http://localhost:8070/attendance/delete/${empID}`).then(
    //         ()=>{
    //             alert("Employee deleted")
    //         }
    //     ).catch((err)=>{
    //         alert(err);
    //     });
    // }


    return (
        <div className="container">
            <h3>Python</h3>
            <div className="btnHeader">
                <button onClick={httpGetIn} class="btn btn-primary">Take Attendance</button>
                <a href="/viewDailyAtt">
                    <button class="btn btn-primary btnView">View Daily Attendance</button>
                </a>
                <input type="text" className="searchBar" id="search" placeholder="Search..." onChange={(e) => { setEmpNo(e.target.value) }} />
                <button class="btn btn-primary btnView" onClick={() => {
                    window.location.replace(`/viewSingleEmployee/${empNo}`);
                }}>Search</button>
            </div>



            <h4>{dateStr}</h4>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Emp No</th>
                        <th scope="col">Entry time</th>
                        <th scope="col">Exit time</th>
                        <th scope="col">Date</th>
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
                                <td><button type="button" className="btn btn-danger btnView" onClick={() => {
                                    window.location.replace(`/deleteAttendance/${employee._id}`);
                                }}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}