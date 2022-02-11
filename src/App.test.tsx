import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders app component with H1 title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Game of Life/i);
  expect(linkElement).toBeInTheDocument();
});
