import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from './itemsSlice';
import { selectProducts } from '../products/productsSlice';
import { addToCart } from '../cart/cartSlice';

export default function Item (props) {
    const dispatch = useDispatch();
    const itemsArr = useSelector(selectItems)
    const thisItem = itemsArr.items.find(({id}) => id === props.id)
    const thisItemQuant = thisItem.quantInComp
    const productsArr = useSelector(selectProducts)
    const thisProduct = productsArr.find(({id}) => id == props.id)


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

    
    
    return (
        <div className='itemContainer'>
            <div className='itemImageContainer'>
                <p>{props.id}</p>
                <p>{thisProduct.name}</p>
                <img src='beans.jpg'></img>
            </div>
            <div className='itemSelectContainer'>
                <button onClick={() => dispatch(changeItemQuant(false))} >
                    <img src='icons/chevLeft.jpg'/>
                </button>
                    <p>{thisItemQuant}</p>
                <button onClick={() => dispatch(changeItemQuant(true))}>
                    <img src='icons/chevRight.jpg'/></button>
                <button onClick={() => dispatch(addToCart(props.id, thisItemQuant, thisProduct.unitPrice))}>
                    <img src='icons/cart.png' />
                </button>
            </div>
        </div>
    )
}
