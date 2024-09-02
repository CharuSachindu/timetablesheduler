import './App.css';
// import { Route, Router, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Sidebar from './Components/Sidebar';
// import ManageLecturers from './page/manageLecturers';
import ManageLecturers from './page/ManageLecturers';
import ManageStudents from './page/ManageStudents';
import ManageModules from './page/ManageModules';
import ManageHalls from './page/ManageHalls';
import GenerateTimeTable from './page/GenerateTimeTable';
import ManageTimetables from './page/ManageTimetables';
import Dashboard from './page/dashboard';
import Sidebar from './Components/Sidebar';

function App() {
  return(
    
    <div className="App">
      {/* <Sidebar /> */}
    
    <Router>
    <Routes>
      <Route path= "/" element={<Sidebar></Sidebar>}>
        
        <Route path="/managelecturers" element={<ManageLecturers></ManageLecturers>} />
        <Route path="/managestudents" element={<ManageStudents></ManageStudents>} />
        <Route path="/managemodules" element={<ManageModules></ManageModules>} />
        <Route path="/managehalls" element={<ManageHalls></ManageHalls>} />
        <Route path="/generatetimetable" element={<GenerateTimeTable></GenerateTimeTable>} />
        <Route path="/managetimetables" element={<ManageTimetables></ManageTimetables>} /> 
    
    </Route>
    </Routes>
    </Router>
    
    </div>
  );
}

export default App;