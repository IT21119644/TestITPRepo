import React from "react";
import { Link } from "react-router-dom"
import logo from "../images/Scandinavian_Tobacco_Group_logo.jpg";

function MyHeader() {
    return (
        // <nav class="navbar navbar-expand-lg bg-light">
        //     <div class="container-fluid">
        //         <a class="navbar-brand" href="#">Navbar</a>
        //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span class="navbar-toggler-icon"></span>
        //         </button>
        //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <li class="nav-item">
        //                     {/* <a class="nav-link active" aria-current="page" href="/">Home</a> */}
        //                     <Link to="/" className="nav-link active">Home</Link>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="/add">Create Student</a>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="/delete">Delete Student</a>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="/update">Update Student</a>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="/runPy">RunPy</a>
        //                 </li>
        //                 <li class="nav-item dropdown">
        //                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        //                         Dropdown
        //                     </a>
        //                     <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        //                         <li><a class="dropdown-item" href="#">Action</a></li>
        //                         <li><a class="dropdown-item" href="#">Another action</a></li>
        //                         <li><hr class="dropdown-divider" /></li>
        //                         <li><a class="dropdown-item" href="#">Something else here</a></li>
        //                     </ul>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link disabled">Disabled</a>
        //                 </li>
        //             </ul>
        //             <form class="d-flex" role="search">
        //                 <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        //                 <button class="btn btn-outline-success" type="submit">Search</button>
        //             </form>
        //         </div>
        //     </div>
        // </nav>
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#4F4845" }}>
                <div className="container-fluid">
                    <img className="navbar-brand" src={logo} width="5%" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ margin: "center" }}>
                            <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/add" style={{ color: "white" }}>Add student &nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/delete" style={{ color: "white" }}>Delete student &nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/update" style={{ color: "white" }}>Update student &nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/runPy" style={{ color: "white" }}>Python &nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default MyHeader;