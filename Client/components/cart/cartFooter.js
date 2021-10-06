import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalPrice, submitOrder } from './cartSlice';
import { selectLoginStatus, selectProceedToPayment } from '../login/loginSlice';
import { toast } from 'react-toastify';
import { proceedToPayment as proceedToPaymentAction } from '../login/loginSlice';
import Payment from './payments/Payment';
import { selectProducts } from '../products/productsSlice';
import { api } from '../../api/api';

export default function CartFooter() {
    const cartTotal = useSelector(selectCartTotalPrice)
    const loggedIn = useSelector(selectLoginStatus)
    const proceedToPayment = useSelector(selectProceedToPayment)
    const dispatch = useDispatch()
    
    const products = useSelector(selectProducts)
    const cartItems = useSelector(selectCartItems)


    const handleCheckoutRequest = () => {
        if (!loggedIn){
            toast('Log in to proceed to checkout')
        } else {
            dispatch(proceedToPaymentAction())
            const order = handleTestOrder();
            dispatch(submitOrder(order))
            api.getDate();
        }

    }

    const handleTestOrder = () => {
        console.log("Products: ", products);
        console.log("CartItems: ", cartItems);
        const finalOrder = api.transformOrderForDB(cartItems, products)
        return finalOrder;
    }

    return (
        <div className='cartFooter'>
            <p>Total: £{cartTotal.toFixed(2)}</p>
            <button onClick={handleCheckoutRequest}>Checkout</button>
            {proceedToPayment && <Payment /> }
        </div>
    )
}