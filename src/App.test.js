import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Type Ahead Search heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Type Ahead Search/i);
  expect(headingElement).toBeInTheDocument();
});