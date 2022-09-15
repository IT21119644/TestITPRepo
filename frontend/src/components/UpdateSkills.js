import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function UpdateSkills(){
    let [employees, setEmployee] = useState([]);
    const { id } = useParams();

    const [empNo, setEmpNo] = useState("");
    const [name, setName] = useState("");
    const [skill, setSkill] = useState("");
    const [score, setScore] = useState("");
    const [category, setCategory] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:8070/employee/getEmployeeById/${id}`).then((res) => {
            console.log("Hello world");
            setEmpNo(res.data.empNo)
            setName(res.data.name);
            setSkill(res.data.skill);
            setScore(res.data.score);
            setCategory(res.data.category);
        }).catch((err) => {
            console.log(err.response.data);
        })
    }, [])

    function sendData(e) {
        e.preventDefault();

        axios.put(`http://localhost:8070/employee/updateEmp/${empNo}`, {score: score, skill: skill, category: category }).then(() => {
                alert("employee Updated")
                // console.log("employee updated");
            }).catch((err) => {
                alert(err);
            })
    }

    return(
        <div className="formStyle formCls">
            <h1>Update CheckList</h1>
            <form>
                <div className="mb-3">
                    <label for="empNo" className="form-label">Emp No</label>
                    <input type="text" className="form-control" id="empNo" value={empNo} disabled/>
                </div>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} disabled/>
                </div>
                <div className="mb-3">
                    <label for="skills" className="form-label">Skills</label>
                    <input type="text" className="form-control" id="skills" value={skill} onChange={(e) => {
                        setSkill(e.target.value)
                    }}/>
                </div>
                <button type="submit" className="btn btn-success" onClick={sendData}>Update</button>
            </form>
        </div>
    )
}