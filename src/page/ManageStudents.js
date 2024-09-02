import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function ManageStudents() {
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentIndex, setStudentIndex] = useState('');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [index, setIndex] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to send data to the backend (e.g., using fetch or axios)
    console.log('Faculty:', faculty);
    console.log('Department:', department);
    console.log('Batch:', batch);
    console.log('Student Name:', studentName);
    console.log('Student Index Number:', studentIndex);
    console.log('Username:', username);
    console.log('password', password);
    // Reset the form
    // setFaculty('');
    // setDepartment('');
    // setBatch('');
    // setStudentName('');
    // setStudentIndex('');

    axios.post(`http://localhost:5000/createStudents?index=${studentIndex}&name=${studentName}&batch=${batch}&facutly=${faculty}&department=${department}&username=${username}&password=${password}`)
    // axios.post(`http://localhost:5000/api/students/createStudents?index=${studentIndex}`+ studentName,department,batch,faculty)
  .then(response => {
    console.log(response.data); // Handle successful response
  })

  .catch(error => {
    console.error('Error posting data: ', error);
  });
  window.location.reload();
  };

  const departments = {
    'School of Computing': ['SE', 'CC', 'CS', 'DS'],
    'School of Engineering': ['Civil', 'Electronic', 'Mecha', 'Marine']
  };

  return (
    <div className="ManageStudents">
      <h1>Manage Students</h1>
      <form onSubmit={handleSubmit}>
      <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
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
          Student Name:
          <input 
            type="text" 
            value={studentName} 
            onChange={(e) => setStudentName(e.target.value)} 
          />
        </label>
        <label>
          Student Index Number:
          <input 
            type="text" 
            value={studentIndex} 
            onChange={(e) => setStudentIndex(e.target.value)} 
          />
        </label>
        <button type="submit" onClick={(e) => handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default ManageStudents;
