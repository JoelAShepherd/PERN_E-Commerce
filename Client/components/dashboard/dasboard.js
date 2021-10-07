import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName } from '../login/loginSlice';
import { selectOrders } from './dashboardSlice';
import CustomerOrder from './orders/order';
import OrdersHeader from './orders/ordersHeader';
import './dashboard.css'
import { selectPaymentSuccess, resetPaymentState } from '../cart/payments/paymentSlice';
import { clearCart } from '../cart/cartSlice';
import { toast } from "react-toastify";


export default function Dashboard() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName)
  const ordersFetched = useSelector(selectOrders)
  const paymentSuccess = useSelector(selectPaymentSuccess)
  
  if (paymentSuccess){
    dispatch(clearCart());
    toast("Your order has been placed!");
    dispatch(resetPaymentState());
  }


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