import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

afterEach(cleanup);

const renderComponent = () => render(
  <Provider store={store}>
    <App />
  </Provider>
);

test('renders PERNstore as title', () => {
  renderComponent();
  const title = screen.getByText(/PERNstore/i);
  expect(title).toBeInTheDocument();
});

