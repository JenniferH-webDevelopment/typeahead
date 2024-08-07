import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import TypeAheadSearch from './TypeAheadSearch';

// test('renders TypeAheadSearch component', () => {
//   render(<TypeAheadSearch />);
//   const inputElement = screen.getByPlaceholderText(/search.../i);
//   expect(inputElement).toBeInTheDocument();
// });

test('updates input value and filters suggestions on input change', async () => {
  const suggestions = ['Chair', 'Chips', 'Gloves'];
  render(<TypeAheadSearch suggestions={suggestions} />);
  const inputElement = screen.getByPlaceholderText(/search.../i);

  fireEvent.change(inputElement, { target: { value: 'Gloves' } });

  expect(inputElement.value).toBe('Gloves');

  // Wait for the suggestions to appear
  const suggestionItems = await screen.findAllByRole('option');
  
  expect(suggestionItems.length).toBe(1);
  expect(suggestionItems[0]).toHaveTextContent('Gloves');
});

// test('checks if the clear button is visible after typing', () => {
//   render(<TypeAheadSearch />);
//   const inputElement = screen.getByPlaceholderText(/search.../i);

//   fireEvent.change(inputElement, { target: { value: 'G' } });
//   const clearButton = screen.getByLabelText(/clear/i);

//   expect(clearButton).toBeVisible();
// });

test('clears input value on clear button click', () => {
  render(<TypeAheadSearch />);
  const inputElement = screen.getByPlaceholderText(/search.../i);
  const clearButton = screen.getByLabelText(/clear/i);

  fireEvent.change(inputElement, { target: { value: 'G' } });
  fireEvent.click(clearButton);

  expect(inputElement.value).toBe('');
});

// test('performs search and displays results on search button click', () => {
//   render(<TypeAheadSearch />);
//   const inputElement = screen.getByPlaceholderText(/search.../i);
//   const searchButton = screen.getByLabelText(/search/i);

//   expect(searchButton).toBeInTheDocument();

//   fireEvent.change(inputElement, { target: { value: 'Chips' } });
//   fireEvent.click(searchButton);

//   const searchResult = screen.getByText(/Chips/i);
//   expect(searchResult).toBeInTheDocument();
// });

// test('updates input value and clears suggestions on suggestion click', async () => {
//   render(<TypeAheadSearch />);
//   const inputElement = screen.getByPlaceholderText(/search.../i);

//   fireEvent.change(inputElement, { target: { value: 'Ch' } });

//   expect(inputElement.value).toBe('Ch');

//   const suggestionItem = await screen.findByText((content, element) => {
//     return element.textContent.includes('Chips');
//   });
//   expect(suggestionItem).toBeInTheDocument();

//   fireEvent.click(suggestionItem);

//   expect(inputElement.value).toBe('Chips');

//   const remainingSuggestions = screen.queryAllByText((content, element) => {
//     return element.textContent.includes('Ch');
//   });
//   expect(remainingSuggestions.length).toBe(0); // Ensure suggestions are cleared
// });