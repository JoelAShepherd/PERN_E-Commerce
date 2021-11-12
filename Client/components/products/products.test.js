import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store'
import App from '../../app';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';



afterEach(cleanup);

const renderComponent = () => render(
  <Provider store={store}>
    <App />
  </Provider>
);


test('render loading state followed by products', async () => {
  const { queryByText } = renderComponent();

  expect(queryByText('no data yet')).toBeInTheDocument();
  expect(queryByText('Products')).not.toBeInTheDocument()

  await waitFor(() => expect(queryByText('Products')).toBeInTheDocument())
  expect(queryByText('Beans')).toBeInTheDocument();
  expect(queryByText('Ham')).toBeInTheDocument();

})