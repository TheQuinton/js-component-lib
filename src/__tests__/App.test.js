import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders', () => {
  render(<App />);
  const linkElement = screen.getByText(/React Collapsible Panel Example/i);
  expect(linkElement).toBeInTheDocument();
});
