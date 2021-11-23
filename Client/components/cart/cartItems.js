import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from './cartSlice.js';
import { selectProducts } from '../products/productsSlice.js';
import { addToCart, removeFromCart } from './cartSlice.js';

export default function CartItem (props) {
    const dispatch = useDispatch()
    const productArr = useSelector(selectProducts)
    const thisProduct = productArr.find(({product_id}) => product_id == props.id)
    
    const cartArr = useSelector(selectCartItems)
    const thisItem = cartArr.find(({id}) => id == props.id)
    const thisProdUnitPrice = parseFloat(thisProduct.unit_price)
    

    const subtotal = (thisItem.quantity * thisProdUnitPrice).toFixed(2);

    const formatedUnitPrice = `£${thisProdUnitPrice.toFixed(2)}`

    return (
        <div className='cartItemContainer'>
            <div className="cartItemNameCont">
                <p>{thisProduct.name}</p>
            </div>
            <div className="cartItemQuantContainer">
                <button onClick={() => dispatch(removeFromCart(props.id, false, thisProdUnitPrice))}>-</button>
                    <p>{thisItem.quantity}</p>
                <button onClick={() => dispatch(addToCart(props.id, 1, thisProdUnitPrice))}>+</button>
            </div>
            <div className="cartItemUPCont">
                <p>{formatedUnitPrice}</p>
            </div>
            <div className="cartItemSTCont">
                <p>£{subtotal}</p>
            </div>
            <button onClick={() => dispatch(removeFromCart(props.id, true, thisProdUnitPrice))}>X</button>
        </div>
    )
}