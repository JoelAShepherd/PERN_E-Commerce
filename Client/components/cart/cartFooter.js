import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from './cartSlice';
import { selectLoginStatus } from '../login/loginSlice';
import { toast } from 'react-toastify';

export default function CartFooter() {
    const cartTotal = useSelector(selectCartTotalPrice)
    const loggedIn = useSelector(selectLoginStatus)

    const handleCheckoutRequest = () => {
        if (!loggedIn){
            toast('Log in to proceed to checkout')
        }
    }

    return (
        <div className='cartFooter'>
            <p>Total: £{cartTotal.toFixed(2)}</p>
            <button onClick={handleCheckoutRequest}>Checkout</button>
        </div>
    )
}