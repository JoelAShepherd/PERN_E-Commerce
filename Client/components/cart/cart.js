import React from 'react';
import CartItem from './cartItems';
import CartFooter from './cartFooter';
import { useSelector } from 'react-redux';
import { selectCartItems } from './cartSlice';
import {selectPaymentSuccess } from './payments/paymentSlice';
import { Redirect } from 'react-router-dom';

export default function Cart() {
    const cartItemsArr = useSelector(selectCartItems)
    const paymentAndOrderCompleted = useSelector(selectPaymentSuccess)

    if (paymentAndOrderCompleted) {
        return (
            <Redirect to="/login"/>
        )
    }


    if (cartItemsArr.length === 0){
        return (
            <div className="cartContainer">
                <p>Nothing in cart</p>
            </div>
        )
    }

    return (
        <div className="cartContainer">
            {cartItemsArr.map((cartItem, index) => 
                <CartItem id={cartItem.id} key={index} />
            )}
            <CartFooter />
        </div>
    )
} 