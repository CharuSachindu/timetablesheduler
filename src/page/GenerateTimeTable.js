import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function GenerateTimeTable() {
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [module, setModule] = useState('');
  const [modules, setModules] = useState([]);
  const [building, setBuilding] = useState('');
  const [hall, setHall] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [lecturer, setLecturer] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [halls, setHalls] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to send data to the backend (e.g., using fetch or axios)
    console.log('Faculty:', faculty);
    console.log('Department:', department);
    console.log('Batch:', batch);
    console.log('Module:', module);
    console.log('Building:', building);
    console.log('Hall:', hall);
    console.log('Lecturer ID:', lecturerId);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Date:', date);

    axios.post(`http://localhost:5000/createGenerateTimeTable?facutly=${faculty}&department=${department}&batch=${batch}&modules=${module}&building_name=${building}&hallID=${hall}&lec_id=${lecturerId}&start_time=${startTime}&end_time=${endTime}&date=${date}`)
    // axios.post(`http://localhost:5000/api/students/createStudents?index=${studentIndex}`+ studentName,department,batch,faculty)
  .then(response => {
    console.log(response.data); // Handle successful response
  })
  // window.location.reload();

    // // Reset the form
    // setFaculty('');
    // setDepartment('');
    // setBatch('');
    // setModule('');
    // setBuilding('');
    // setHall('');
    // setLecturerId('');
    // setStartTime('');
    // setEndTime('');
    // setDate('');
  };

  const departments = {
    'School of Computing': ['SE', 'CC', 'CS', 'DS'],
    'School of Engineering': ['Civil', 'Electronic', 'Mecha', 'Marine']
  };

  // const modules = [
  //   '2025 module 01', '2025 module 02', '2025 module 03',
  //   '2026 module 01', '2026 module 02', '2026 module 03',
  //   '2027 module 01', '2027 module 02', '2027 module 03',
  //   '2028 module 01', '2028 module 02', '2028 module 03'
  // ];

  // const halls = {
  //   'New Building': ['NB GG 01', 'NB GG 02', 'NB FF 01', 'NB FF 02'],
  //   'Reasearch Building': ['RB GG 01', 'RB GG 02', 'RB FF 01', 'RB FF 02'],
  //   'Main Building': ['MB GG 01', 'MB GG 02', 'MB FF 01', 'MB FF 02'],
  //   'Honnor Building': ['HB GG 01', 'HB GG 02', 'HB FF 01', 'HB FF 02']
  // };

  useEffect(() => {
    axios.get('http://localhost:5000/getModules')
        .then(result => setModules(result.data))
        .catch(err => console.log(err))
    console.log(modules)
    axios.get('http://localhost:5000/getLectureHalls')
        .then(result => setBuildings(result.data))
        .catch(err => console.log(err))
    console.log(buildings)
}, [])

useEffect(() => {
  axios.get(`http://localhost:5000/getLecturersbyCode?moduleCode=${module}`)
      .then(result => setLecturer(result.data))
      .catch(err => console.log(err))
  console.log(lecturer)
}, [module])

useEffect(() => {
  axios.get(`http://localhost:5000/getLectureHallsByBuilding?building=${building}`)
      .then(result => setHalls(result.data))
      .catch(err => console.log(err))
  console.log(halls)
}, [building])

  return (
    <div className="GenerateTimeTable">
      <h1>Generate Time Table</h1>
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
          Choose the Module:
          <select 
            value={module} 
            onChange={(e) => setModule(e.target.value)}
          >
            <option value="">Select Module</option>
            {modules.map((modules, index) => (
              <option key={index} value={modules.moduleCode}>{modules.moduleCode}</option>
            ))}
          </select>
        </label>
        <label>
          Lecturer ID:
          <input 
            type="text" 
            value={lecturer[0]?.lec_id} 
            disabled={true}
          />
        </label>
        <label>
          Lecturer Name:
          <input 
            type="text" 
            value={lecturer[0]?.name} 
            disabled={true}
          />
        </label>
        <label>
          Building Name:
          <select 
            value={building} 
            onChange={(e) => {
              setBuilding(e.target.value);
              setHall('');
            }}
          >
            <option value="">Select Building</option>
            {buildings && buildings.map((building, index) => (
              <option key={index} value={building.building_name}>{building.building_name}</option>
            ))}
          </select>
        </label>
        <label>
          Hall ID:
          <select 
            value={hall} 
            onChange={(e) => setHall(e.target.value)}
            disabled={!building}
          >
            <option value="">Select Hall</option>
            {halls && halls.map((halls, index) => (
              <option key={index} value={halls}>{halls}</option>
            ))}
          </select>
        </label>
        <label>
          Start Time:
          <input 
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)} 
          />
        </label>
        <label>
          End Time:
          <input 
            type="time" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
          />
        </label>
        <label>
          Date:
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </label>
        <button type="submit" onClick={(e) => handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default GenerateTimeTable;
