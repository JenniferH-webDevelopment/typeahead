import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import TypeAheadSearch from './TypeAheadSearch';

test('renders TypeAheadSearch component', () => {
  render(<TypeAheadSearch />);
  const inputElement = screen.getByPlaceholderText(/search.../i);
  expect(inputElement).toBeInTheDocument();
});

test('updates input value and filters suggestions on input change', async () => {
  const suggestions = [
    { id: 1, name: 'Chair' },
    { id: 2, name: 'Chips' },
    { id: 3, name: 'Gloves' }
  ];
  render(<TypeAheadSearch suggestions={suggestions} />);
  const inputElement = screen.getByPlaceholderText(/search.../i);

  fireEvent.change(inputElement, { target: { value: 'Gloves' } });
  const suggestionElement = await screen.findByText(/Gloves/i);
  expect(suggestionElement).toBeInTheDocument();
});

test('checks if the clear button is visible after typing', () => {
  render(<TypeAheadSearch />);
  const inputElement = screen.getByPlaceholderText(/search.../i);

  fireEvent.change(inputElement, { target: { value: 'G' } });
  const clearButton = screen.getByLabelText(/clear/i);

  expect(clearButton).toBeVisible();
});

test('clears input value on clear button click', async () => {
  const suggestions = [
    { id: 1, name: 'Chair' },
    { id: 2, name: 'Chips' },
    { id: 3, name: 'Gloves' }
  ];
  render(<TypeAheadSearch suggestions={suggestions} />);
  const inputElement = screen.getByPlaceholderText(/search.../i);

  fireEvent.change(inputElement, { target: { value: 'Gloves' } });
  expect(inputElement.value).toBe('Gloves');

  const clearButton = screen.getByLabelText(/clear/i);
  fireEvent.click(clearButton);

  expect(inputElement.value).toBe('');
});

test('performs search and displays results on search button click', async () => {
  const suggestions = [
    { id: 1, name: 'Chair' },
    { id: 2, name: 'Chips' },
    { id: 3, name: 'Gloves' }
  ];
  render(<TypeAheadSearch suggestions={suggestions} />);
  const inputElement = screen.getByPlaceholderText(/search.../i);

  fireEvent.change(inputElement, { target: { value: 'Ch' } });
  expect(inputElement.value).toBe('Ch');

  const searchButton = screen.getByLabelText(/search/i);
  fireEvent.click(searchButton);

  const resultItems = await screen.findAllByRole('option');
  expect(resultItems).toHaveLength(2);
  expect(resultItems[0]).toHaveTextContent('Chair');
  expect(resultItems[1]).toHaveTextContent('Chips');
});

test('updates input value and clears suggestions on suggestion click', async () => {
  const suggestions = [
    { id: 1, name: 'Chair' },
    { id: 2, name: 'Chips' },
    { id: 3, name: 'Gloves' }
  ];
  render(<TypeAheadSearch suggestions={suggestions} />);
  const inputElement = screen.getByPlaceholderText(/search.../i);

  fireEvent.change(inputElement, { target: { value: 'Ch' } });
  expect(inputElement.value).toBe('Ch');

  const suggestionItem = await screen.findByText('Chair');
  fireEvent.click(suggestionItem);

  expect(inputElement.value).toBe('Chair');

  const suggestionList = screen.queryByRole('listbox');
  expect(suggestionList).toBeNull();
});