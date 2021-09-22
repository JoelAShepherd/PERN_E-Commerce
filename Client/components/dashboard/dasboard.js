import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName } from '../login/loginSlice';
import { api } from '../../api/api';
import { uploadOrders, selectOrders } from './dashboardSlice';
import CustomerOrder from './orders/order';

export default function Dashboard() {
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)
  const ordersFetched = useSelector(selectOrders)

  const OHbuttonClick = async () => {
    const orders = await api.getOrderHistory()
    console.log('Orders in dashboard: ', orders)
    dispatch(uploadOrders(orders))
  }

  

  return(
    <div>
      <h2>Dashboard</h2>
      <p>Hello {userName}</p>
      <h3>Order History</h3>
      <button onClick={OHbuttonClick}>OH</button>
      {ordersFetched ? (ordersFetched.map((order, index) => 
        <CustomerOrder key={index} order={order} /> 
      )) : <p>No order history yet</p>}
    </div>
  );
}

