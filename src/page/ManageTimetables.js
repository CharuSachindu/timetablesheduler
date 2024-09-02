import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function ManageTimetables() {
  const [timetables, setTimetables] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [modules, setModules] = useState([]);
  const [buildings,setBuildings] = useState([]);
  const [halls, setHalls] = useState([]);
  const [lecturer, setLecturer] = useState([]);
  const [building, setBuilding] = useState();
  const [module,setModule] = useState();
  const [buildingSearch,setBuildingSearch] = useState(selectedTimetable?.building_name);



      useEffect(() => {
        axios.get('http://localhost:5000/getGenerateTimeTable')
            .then(result => setTimetables(result.data))
            .catch(err => console.log(err))
        console.log(timetables)
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
      axios.get(`http://localhost:5000/getLectureHallsByBuilding?building=${selectedTimetable?.building_name}`)
          .then(result => setHalls(result.data))
          .catch(err => console.log(err))
      console.log(halls)
      
    }, [selectedTimetable])

    useEffect(() => {
       setBuilding(selectedTimetable?.building_name)
      setModule(selectedTimetable?.modules)
    }, [selectedTimetable])






  const handleEdit = (timetable) => {
    setSelectedTimetable(timetable);
    console.log(selectedTimetable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to update the timetable in the backend (e.g., using fetch or axios)
    fetch(`http://localhost:5000/updateStudents/${selectedTimetable._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedTimetable)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Timetable updated:', data);
        setSelectedTimetable(null);
        // Refresh the timetables list
        fetch('/api/timetables')
          .then(response => response.json())
          .then(data => setTimetables(data));
      })
      .catch(error => console.error('Error updating timetable:', error));
      window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTimetable({ ...selectedTimetable, [name]: value });
  };

  return (
    <div className="ManageTimetables">
      <h1>Manage Timetables</h1>
      {selectedTimetable ? (
        <form onSubmit={handleSubmit}>
          <label>
            Faculty:
            <select name="facutly" value={selectedTimetable.facutly} onChange={handleChange}>
              <option value="School of Computing">School of Computing</option>
              <option value="School of Engineering">School of Engineering</option>
            </select>
          </label>
          <label>
            Department:
            <select name="department" value={selectedTimetable.department} onChange={handleChange}>
              {selectedTimetable.facutly === 'School of Computing' && ['SE', 'CC', 'CS', 'DS'].map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
              {selectedTimetable.facutly === 'School of Engineering' && ['Civil', 'Electronic', 'Mecha', 'Marine'].map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </label>
          <label>
            Batch:
            <select name="batch" value={selectedTimetable.batch} onChange={handleChange}>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>
          </label>
          <label>
            Module:
            <select name="modules" value={selectedTimetable.module} onChange={handleChange}>
              {/* {modules && modules.map(mod => (
                <option key={mod} value={mod}>{mod}</option>
                
              ))} */}
              {modules.map((modules, index) => (
              <option key={index} value={modules.moduleCode}>{modules.moduleCode}</option>
            ))}
            </select>
          </label>
          <label>
            Building Name:
            <select name="building_name" value={selectedTimetable.building_name} onChange={(e) => {handleChange(e);setBuildingSearch(e.target.value);}}>
            {buildings && buildings.map((building, index) => (
              <option key={index} value={building.building_name}>{building.building_name}</option>
            ))}
            </select>
          </label>
          <label>
            Hall ID:
            <select name="hall"  onChange={handleChange}>
              {/* {selectedTimetable.building && halls[selectedTimetable.building].map(hallId => (
                <option key={hallId} value={hallId}>{hallId}</option>
              ))} */}
               {halls && halls.map((halls, index) => (
              <option key={index} value={halls}>{halls}</option>
            ))}
              
            </select>
          </label>
          <label>
            Lecturer ID:
            <input type="text" name="lec_id" value={lecturer[0]?.lec_id}/>
          </label>
          <label>
            Start Time:
            <input type="time" name="start_time" value={selectedTimetable.start_time} onChange={handleChange} />
          </label>
          <label>
            End Time:
            <input type="time" name="end_time" value={selectedTimetable.end_time} onChange={handleChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={selectedTimetable.date} onChange={handleChange} />
          </label>
          <button type="submit" onClick={(e) => handleSubmit}>Submit</button>
        </form>
      ) : (
        <ul>
          {timetables.map(timetable => (
            <li key={timetable.id} onClick={() => handleEdit(timetable)}>
              {`${timetable.facutly} - ${timetable.department} - ${timetable.modules} - ${timetable.date}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageTimetables;
