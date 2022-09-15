import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function ViewEmployee(){
    let [employees, setEmployee] = useState([]);
    const { category } = useParams();

    useEffect(()=>{
        const getAttendance = async () => {
            const { data: res } = await axios.get(`http://localhost:8070/employee/getEmployeeByCat/${category}`);
            setEmployee(res);
            console.log(employees);
        }
        getAttendance();
    }, [])

    return(
        <div className="mainBodyView">
            <h3>{category}</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Emp No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Skill</th>
                        <th scope="col">Score</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => {
                        return (
                            <tr>
                                <td>{employee.empNo}</td>
                                <td>{employee.name}</td>
                                <td>{employee.skill}</td>
                                <td>{employee.score}</td>
                                <td>{employee.category}</td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={() => {
                                        window.location.replace(`/updateSkills/${employee._id}`);
                                    }}>Update</button>
                                    <button type="button" className="btn btn-danger btnView" disabled>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}