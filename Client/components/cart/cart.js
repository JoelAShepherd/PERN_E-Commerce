import React from 'react';
import CartItem from './cartItems.js';
import CartFooter from './cartFooter.js';
import CartHeader from './cartHeader.js';
import { useSelector } from 'react-redux';
import { selectCartItems } from './cartSlice.js';
import {selectPaymentSuccess } from './payments/paymentSlice.js';
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
            <CartHeader />
            {cartItemsArr.map((cartItem, index) => 
                <CartItem id={cartItem.id} key={index} />
            )}
            <CartFooter />
        </div>
    )
} 