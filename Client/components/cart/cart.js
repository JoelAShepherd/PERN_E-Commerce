import React from 'react';
import CartItem from './cartItems';
import CartFooter from './cartFooter';
import { useSelector } from 'react-redux';
import { selectCartItems } from './cartSlice';

export default function Cart() {
    const cartItemsArr = useSelector(selectCartItems)
    console.log('cartItems', cartItemsArr)


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