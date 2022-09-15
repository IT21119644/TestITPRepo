import './App.css';
import MyHeader from './components/Header';
import AddStudent from './components/AddStudent';
import { Route, Routes } from "react-router-dom";
import AllStudents from './components/AllStudents';
import DeleteStudent from './components/DeleteStudent';
import UpdateStudent from './components/UpdateStudent';
import ImgUpload from './components/ImgUpload';
import RunPython from './components/RunPython';
import ViewDailyAttendance from './components/ViewDailyAttendance';
import UpdateAttendance from './components/UpdateAttendance';
import DeleteAttendance from './components/DeleteAttendance';
import ViewSingleEmployeeAtt from './components/ViewSingleEmployeeAtt';

export default function App() {
  return (
    <div>
      {/* <h1>Hello React</h1> */}
      {/* calling the CounterClass in app.js
      <CounterClass/> 

      <CounterFunction/> */}

      <MyHeader />
      {/* <DeleteStudent/> */}

      <Routes>
        <Route path="/add" element={[ <AddStudent />]} />
        <Route path="/" element={<AllStudents />} />
        <Route path="/delete" element={<DeleteStudent/>}/>
        <Route path="/update" element={<UpdateStudent/>}/>
        <Route path="/runPy" element={<RunPython/>}/>
        <Route path="/viewDailyAtt" element={<ViewDailyAttendance/>}/>
        <Route path="/updateAttendance/:id" element={<UpdateAttendance/>}/>
        <Route path="/deleteAttendance/:id" element={<DeleteAttendance/>}/>
        <Route path="/viewSingleEmployee/:empNo" element={<ViewSingleEmployeeAtt/>}/>
      </Routes>

      {/* <AddStudent /> */}
    </div>

  );
}

