import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function ViewCheckList(){
    let [checkLists, setCheckList] = useState([]);

    useEffect(()=>{
        const getCheckList = async () => {
            const { data: res } = await axios.get('http://localhost:8070/checkList/getCheckList');
            setCheckList(res);
            console.log(checkLists);
        }
        getCheckList();
    }, [])


    return(
        <div className="mainBodyView">
            <a href="/addCheckList">
                <button class="btn btn-primary">Add checkList</button>
            </a>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {checkLists.map((checkList) => {
                        return (
                            <tr>
                                <td>{checkList.name}</td>
                                <td>{checkList.score}</td>
                                <td>{checkList.date}</td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={() => {
                                        window.location.replace(`/updateCheckList/${checkList._id}`);
                                    }}>Update</button>
                                    <button type="button" className="btn btn-danger btnView" onClick={() => {
                                        window.location.replace(`/deleteCheckList/${checkList._id}`);
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