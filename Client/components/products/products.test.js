import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store'
import App from '../../app';
import { render, cleanup, waitFor, within, fireEvent, screen } from '@testing-library/react';
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


test('Plus button increments value', async() => {
    const { queryByText } = renderComponent();

    await waitFor(() => expect(queryByText('Products')).toBeInTheDocument())

    const product1 = await screen.findByTestId("product1");
    const product1IncrementButton = within(product1).getByRole("increment");
    const product1Value = within(product1).getByRole("itemQuantity")
    console.log(product1Value.textContent)
    expect(product1Value.textContent).toEqual("5")

    fireEvent.click(product1IncrementButton)
    expect(product1Value.textContent).toEqual("6")


})

test('Minus button decrements value', async() => {
    const { queryByText } = renderComponent();

    await waitFor(() => expect(queryByText('Products')).toBeInTheDocument())

    const product2 = await screen.findByTestId("product2");
    const product2DecrementButton = within(product2).getByRole("decrement");
    const product2Value = within(product2).getByRole("itemQuantity")
    
    expect(product2Value.textContent).toEqual("5")

    fireEvent.click(product2DecrementButton)
    expect(product2Value.textContent).toEqual("4")


})