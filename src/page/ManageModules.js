import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function ManageModules() {
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [module, setModule] = useState('');
  const [moduleName, setModuleName] = useState();
  const [moduleCode, setModuleCode] = useState();
  const [lecturers, setLecturers] = useState([]);
  const [lecturerID, setLecturerID] = useState();
  const [lecturerName, setLecturerName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to send data to the backend (e.g., using fetch or axios)
    console.log('Faculty:', faculty);
    console.log('Department:', department);
    console.log('Batch:', batch);
    console.log('Module:', module);

    axios.post(`http://localhost:5000/createModules?faculty=${faculty}&department=${department}&batch=${batch}&moduleName=${moduleName}&moduleCode=${moduleCode}&lecturerID=${lecturerID}`)
    // axios.post(`http://localhost:5000/api/students/createStudents?index=${studentIndex}`+ studentName,department,batch,faculty)
  .then(response => {
    console.log(response.data); // Handle successful response
  })
  .catch(error => {
    console.error('Error posting data: ', error);
  });

  window.location.reload();

    // Reset the form
    setFaculty('');
    setDepartment('');
    setBatch('');
    setModule('');
  };

  const departments = {
    'School of Computing': ['SE', 'CC', 'CS', 'DS'],
    'School of Engineering': ['Civil', 'Electronic', 'Mecha', 'Marine']
  };

  useEffect(() => {
    axios.get('http://localhost:5000/getLecturers')
        .then(result => setLecturers(result.data))
        .catch(err => console.log(err))
    console.log(lecturers)
}, [])

  // const modules = [
  //   '2025 module 01', '2025 module 02', '2025 module 03',
  //   '2026 module 01', '2026 module 02', '2026 module 03',
  //   '2027 module 01', '2027 module 02', '2027 module 03',
  //   '2028 module 01', '2028 module 02', '2028 module 03'
  // ];

  return (
    <div className="ManageModules">
      <h1>Manage Modules</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Choose the faculty:
          <select 
            value={faculty} 
            onChange={(e) => {
              setFaculty(e.target.value);
              setDepartment('');
            }}
          >
            <option value="">Select Faculty</option>
            <option value="School of Computing">School of Computing</option>
            <option value="School of Engineering">School of Engineering</option>
          </select>
        </label>
        <label>
          Choose the Department:
          <select 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
            disabled={!faculty}
          >
            <option value="">Select Department</option>
            {faculty && departments[faculty].map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </label>
        <label>
          Choose the Batch:
          <select 
            value={batch} 
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value="">Select Batch</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
        </label>
        <label>
          Module Name:
          <input 
            type="text" 
            value={moduleName} 
            onChange={(e) => setModuleName(e.target.value)} 
          />
        </label>
        <label>
          Module Code:
          <input 
            type="text" 
            value={moduleCode} 
            onChange={(e) => setModuleCode(e.target.value)} 
          />
        </label>
        <label>
          Choose the Lecturer:
          <select 
            // value={lecturerName} 
            onChange={(e) => setLecturerID(e.target.value)}
          >
            <option value="">Select Lecturer</option>
            {lecturers && lecturers.map((lecturer, index) => (
              <option key={index} value={lecturer.lec_id}>{lecturer.name}</option>
            ))}
          </select>
        </label>
        <label>
          Lecturer ID:
          <input 
            type="text" 
            value={lecturerID} 
            disabled={true}
          />
        </label>
        <button type="submit" onClick={(e) => handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default ManageModules;
