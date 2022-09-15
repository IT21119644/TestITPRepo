import React, {useState, useEffect} from "react";
import axios from "axios";
// import images from "../../../backend/images/GIT.png";

export default function AllStudents(){
    //students is an empty array
    let [students, setStudents] = useState([]);

    //Fetching data
    useEffect(()=>{
        const getStudents = async()=>{
            const {data: res} = await axios.get("http://localhost:8070/student/");
            setStudents(res);
            console.log(students);
        }

        getStudents();
    }, [])

    return(
        <div className="container">
            <br></br>
            <h1>All Students</h1>
            <h2>There are {students.length} students in the DB</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>EmpNo</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student)=>{
                        return(
                            <tr>
                            <td>{student.empNo}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td><img src={student.imgname} className="imgDisplay"/></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}