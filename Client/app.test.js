import { render, screen } from '@testing-library/react';
import App from './app';

test('renders PERN as title', () => {
  render(<App />);
  const linkElement = screen.getByText(/PERN/i);
  expect(linkElement).toBeInTheDocument();
});