import React, { useState, useEffect } from 'react';
import { FormControl, ListGroup, InputGroup } from 'react-bootstrap';
import { FaTimesCircle, FaSearch } from 'react-icons/fa'; // Import the icon from react-icons

const TypeAheadSearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const products = [
    { id: 1, name: 'Chips', picture: 'picture1.jpg' },
    { id: 2, name: 'Chicken', picture: 'picture2.jpg' },
    { id: 3, name: 'Gloves', picture: 'picture3.jpg' },
    // Add more product objects as needed
  ];

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

  const performSearch = () => {
    if (query) {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResult(filtered);
      console.log('Search result:', filtered);
    }
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
            {query && (
              <InputGroup.Text onClick={clearSearch} style={{ cursor: 'pointer' }} aria-label="clear">
                <FaTimesCircle />
              </InputGroup.Text>
            )}
            <InputGroup.Text onClick={performSearch} style={{ cursor: 'pointer' }} aria-label="search">
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
          {filteredSuggestions.length > 0 && (
            <ListGroup className="bg-light border rounded mt-2" role="listbox">
              {filteredSuggestions.map((suggestion) => (
                <ListGroup.Item
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="list-group-item-action"
                  role="option"
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