import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders', () => {
  render(<App />);
  const homeTitle = screen.getByText(/Welcome to Component Library/i);
  expect(homeTitle).toBeInTheDocument();
});
