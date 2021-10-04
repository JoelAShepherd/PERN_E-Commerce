import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalPrice } from './cartSlice';
import { selectLoginStatus, selectProceedToPayment } from '../login/loginSlice';
import { toast } from 'react-toastify';
import { proceedToPayment as proceedToPaymentAction } from '../login/loginSlice';
import Payment from './payments/Payment';

export default function CartFooter() {
    const cartTotal = useSelector(selectCartTotalPrice)
    const loggedIn = useSelector(selectLoginStatus)
    const proceedToPayment = useSelector(selectProceedToPayment)
    const dispatch = useDispatch()
    


    const handleCheckoutRequest = () => {
        if (!loggedIn){
            toast('Log in to proceed to checkout')
        } else {
            dispatch(proceedToPaymentAction())
        }

    }

    return (
        <div className='cartFooter'>
            <p>Total: £{cartTotal.toFixed(2)}</p>
            <button onClick={handleCheckoutRequest}>Checkout</button>
            {proceedToPayment && <Payment /> }
        </div>
    )
}