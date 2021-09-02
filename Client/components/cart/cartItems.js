import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from './cartSlice';
import { selectProducts } from '../../api/fakeAPI';
import { addToCart, removeFromCart } from './cartSlice';

export default function CartItem (props) {
    const dispatch = useDispatch()
    const productArr = useSelector(selectProducts)
    const thisProduct = productArr.find(({id}) => id == props.id)
    const cartArr = useSelector(selectCartItems)
    const thisItem = cartArr.find(({id}) => id == props.id)

    const subtotal = thisItem.quantity * thisProduct.unitPrice;

    

    return (
        <div className='cartItemContainer'>
            <p>{thisProduct.name}</p>
            <div className="cartItemQuantContainer">
                <button onClick={() => dispatch(removeFromCart(props.id, false))}>-</button>
                    <p>{thisItem.quantity}</p>
                <button onClick={() => dispatch(addToCart(props.id, 1))}>+</button>
            </div>
            <p>{thisProduct.unitPrice}</p>
            <p>{subtotal}</p>
            <button onClick={() => dispatch(removeFromCart(props.id, true))}>X</button>
        </div>
    )
}