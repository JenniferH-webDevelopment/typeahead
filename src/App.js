import React, { useEffect, useState } from 'react';
import './App.css';
import TypeAheadSearch from "./components/TypeAheadSearch";

function App() {  
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('https://66b1f5581ca8ad33d4f5e656.mockapi.io/api/product')
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error('Error fetching suggestions:', error));
  }, []);
  
  return (
    <div className="App">
      <div className="container mt-5">
        <h1>Type Ahead Search</h1>
        <TypeAheadSearch suggestions={suggestions}  />
      </div>
    </div>    
  );
}

export default App;