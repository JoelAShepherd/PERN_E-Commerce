import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalPrice, submitOrder } from './cartSlice.js';
import { selectLoginStatus } from '../login/loginSlice.js';
import { toast } from 'react-toastify';
import Payment from './payments/Payment.js';
import { selectProducts } from '../products/productsSlice.js';
import { api } from '../../api/api.js';
import { startPaymentProcess, selectPaymentProcessStarted } from './payments/paymentSlice.js';

export default function CartFooter() {
    const cartTotal = useSelector(selectCartTotalPrice)
    const loggedIn = useSelector(selectLoginStatus)
    const paymentStarted = useSelector(selectPaymentProcessStarted)
    const dispatch = useDispatch()
    
    const products = useSelector(selectProducts)
    const cartItems = useSelector(selectCartItems)


    const handleCheckoutRequest = () => {
        if (!loggedIn){
            toast('Log in to proceed to checkout')
        } else {
            dispatch(startPaymentProcess())
            const order = handleTestOrder();
            dispatch(submitOrder(order))
            
        }

    }

    const handleTestOrder = () => {
        const finalOrder = api.transformOrderForDB(cartItems, products)
        return finalOrder;
    }

    return (
        <div className='cartFooter'>
            <p>Total: £{cartTotal.toFixed(2)}</p>
            <button onClick={handleCheckoutRequest}>Checkout</button>
            {paymentStarted && <Payment /> }
        </div>
    )
}