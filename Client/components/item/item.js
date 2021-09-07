import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from './itemsSlice';
import { selectProducts } from '../products/productsSlice';
import { addToCart } from '../cart/cartSlice';

export default function Item (props) {
    const dispatch = useDispatch();
    const itemsArr = useSelector(selectItems)
    console.log('Items arr', itemsArr)
    console.log('This prop id :', props.id)
    const thisItem = itemsArr.items.find(({id}) => id === props.id)
    console.log('this item: ', thisItem)
    const thisItemQuant = thisItem.quantInComp
    const productsArr = useSelector(selectProducts)
    console.log('** products Arr', productsArr)
    const thisProduct = productsArr.find(({product_id}) => product_id == props.id)
    console.log('**** this product', thisProduct)


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
