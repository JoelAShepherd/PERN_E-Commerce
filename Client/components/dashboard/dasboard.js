import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserName } from '../login/loginSlice';
import { selectOrders } from './dashboardSlice';
import CustomerOrder from './orders/order';
import OrdersHeader from './orders/ordersHeader';


import './dashboard.css'


export default function Dashboard() {
  const userName = useSelector(selectUserName)
  const ordersFetched = useSelector(selectOrders)

  console.log('Orders fetched: ', JSON.stringify(ordersFetched))


  return(
    <div>
      <h2>Dashboard</h2>
      <p>Hello {userName}</p>
      <div className='orderHistoryContainer'>
      <h3>Order History</h3>
        {ordersFetched && <OrdersHeader />}
        { ordersFetched ?
          (ordersFetched.map((order, index) => 
          <CustomerOrder key={index} order={order}/>)) :
          <p>You haven't placed any orders yet</p>
        }
      </div>
    </div>
  );
}

/* 



*/