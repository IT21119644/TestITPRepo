import './App.css';
import{BrowserRouter as Router, Route} from "react-router-dom";
import ViewNineGrid from './components/ViewNineGrid';
import ViewCheckList from "./components/ViewCheckList"
import Header from './components/Header';
import AddCheckList from './components/AddCheckList';
import UpdateCheckList from './components/UpdateCheckList';
import DeleteCheckList from './components/DeleteCheckList';
import ViewEmployee from './components/ViewEmployees';
import UpdateSkills from './components/UpdateSkills';
import ViewSingleEmployee from './components/ViewSingleEmployee';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Route path="/skillmetric" exact component = {ViewNineGrid} />
        <Route path="/viewCheckList" exact component = {ViewCheckList} />
        <Route path="/addCheckList" exact component = {AddCheckList} />
        <Route path="/updateCheckList/:id" exact component = {UpdateCheckList} />
        <Route path="/deleteCheckList/:id" exact component = {DeleteCheckList} />
        <Route path="/viewEmployee/:category" exact component = {ViewEmployee} />
        <Route path="/updateSkills/:id" exact component = {UpdateSkills} />
        <Route path="/viewSingleEmployee/:empNo" exact component = {ViewSingleEmployee} />
      </div>
      
    </Router>
  );
}

export default App;
