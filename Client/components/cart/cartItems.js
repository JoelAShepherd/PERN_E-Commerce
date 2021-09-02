import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from './cartSlice';
import { selectProducts } from '../../api/fakeAPI';

export default function CartItem (props) {
    const productArr = useSelector(selectProducts)
    const thisProduct = productArr.find(({id}) => id == props.id)
    const cartArr = useSelector(selectCartItems)
    const thisItem = cartArr.find(({id}) => id == props.id)

    const subtotal = thisItem.quantity * thisProduct.unitPrice;

    return (
        <div className='cartItemContainer'>
            <p>{thisProduct.name}</p>
            <p>{thisItem.quantity}</p>
            <p>{thisProduct.unitPrice}</p>
            <p>{subtotal}</p>
        </div>
    )
}