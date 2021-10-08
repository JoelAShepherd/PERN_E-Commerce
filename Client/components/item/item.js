import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from './itemsSlice';
import { selectProducts } from '../products/productsSlice';
import { addToCart } from '../cart/cartSlice';
import { Link } from 'react-router-dom';

export default function Item (props) {
    const dispatch = useDispatch();
    const itemsArr = useSelector(selectItems)
    
    const thisItem = itemsArr.find(({id}) => id === props.id)
    
    const thisItemQuant = thisItem.quantInComp
    const productsArr = useSelector(selectProducts)
    const thisProduct = productsArr.find(({product_id}) => product_id == props.id)
    const thisProdUnitPrice = parseFloat(thisProduct.unit_price)


    function changeItemQuant(bool){
        let payload = {
            id: props.id,
            direction: bool
        }
        return {
            type: "items/changeItem",
            payload
        }
    }

    const link = `/products/${thisProduct.name}`
    
    return (
        <div className='itemContainer'>
            <div className='itemImageContainer'>
                <p>{props.id}</p>
                <Link to={link}>{thisProduct.name}</Link>
                <img src='beans.jpg'></img>
            </div>
            <div className='itemSelectContainer'>
                <button onClick={() => dispatch(changeItemQuant(false))} >
                    <img src='icons/chevLeft.jpg'/>
                </button>
                    <p>{thisItemQuant}</p>
                <button onClick={() => dispatch(changeItemQuant(true))}>
                    <img src='icons/chevRight.jpg'/></button>
                <button onClick={() => dispatch(addToCart(props.id, thisItemQuant, thisProdUnitPrice))}>
                    <img src='icons/cart.png' />
                </button>
            </div>
        </div>
    )
}
