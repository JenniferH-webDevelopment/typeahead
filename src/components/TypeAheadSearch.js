import React, { useState, useEffect } from 'react';
import { FormControl, ListGroup, InputGroup, Button } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa'; // Import the icon from react-icons

const TypeAheadSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    // Fetch suggestions from the mock API
    fetch('https://66b1f5581ca8ad33d4f5e656.mockapi.io/api/product')
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error('Error fetching suggestions:', error));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filtered = suggestions.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setFilteredSuggestions([]);
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredSuggestions([]);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
            />
            <InputGroup.Text onClick={clearSearch} style={{ cursor: 'pointer' }}>
              <FaTimesCircle />
            </InputGroup.Text>
          </InputGroup>
          {filteredSuggestions.length > 0 && (
            <ListGroup className="bg-light border rounded mt-2">
              {filteredSuggestions.map((suggestion) => (
                <ListGroup.Item
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="list-group-item-action"
                >
                  {suggestion.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeAheadSearch;