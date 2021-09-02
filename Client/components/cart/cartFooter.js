import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from './cartSlice';

export default function CartFooter() {
    const cartTotal = useSelector(selectCartTotalPrice)
    return (
        <div className='cartFooter'>
            <p>Total: £{cartTotal.toFixed(2)}</p>
        </div>
    )
}