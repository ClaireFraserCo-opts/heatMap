import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch JSON data when the component mounts
    fetch('data/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      {/* Your heatmap visualization component goes here */}
      <h1>Heatmap Visualization</h1>
      {/* Render your heatmap component and pass the fetched data as props */}
      {/* <YourHeatmapComponent data={data} /> */}
    </div>
  );
}

export default App;
