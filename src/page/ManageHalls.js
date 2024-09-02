import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function ManageHalls() {
  const [building, setBuilding] = useState('');
  const [hall, setHall] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Building Name:', building);
    console.log('Hall ID:', hall);

    axios.post(`http://localhost:5000/createLectureHalls?building_name=${building}&hallID=${hall}`)

  .then(response => {
    console.log(response.data); // Handle successful response
  })

  // window.location.reload();

    // Reset the form
    // setBuilding('');
    // setHall(['']);
  };

  const addHall = () => {
    setHall([...hall, '']);
  };

  const handleHallChange = (index, value) => {
    const newHalls = hall.map((hall, i) => (i === index ? value : hall));
    setHall(newHalls);
  };



  return (
    <div className="ManageHalls">
      <h1>Manage Halls</h1>
      <form onSubmit={handleSubmit}>
      <label>
          Building Name:
          <input 
            type="text" 
            value={building} 
            onChange={(e) => setBuilding(e.target.value)} 
          />
        </label>
        {hall.map((hall, index) => (
          <label key={index}>
            Hall ID {index + 1}:
            <input 
              type="text" 
              value={hall} 
              onChange={(e) => handleHallChange(index, e.target.value)} 
            />
          </label>
        ))}
        <button type="button" onClick={addHall}>Add Hall</button>
        <button type="submit" onClick={(e) => handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default ManageHalls;