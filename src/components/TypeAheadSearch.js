import React, { useState } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';

const suggestions = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
];

const TypeAheadSearch = () => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <FormControl
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
          />
          {filteredSuggestions.length > 0 && (
            <ListGroup>
              {filteredSuggestions.map((suggestion, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
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