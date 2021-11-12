import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

test('renders PERN as title', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/PERNTEST/i);
  expect(linkElement).toBeInTheDocument();
});