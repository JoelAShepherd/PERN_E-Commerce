import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from './itemsSlice.js';
import { selectProducts } from '../products/productsSlice.js';
import { addToCart } from '../cart/cartSlice.js';
import { Link } from 'react-router-dom';
import { env } from '../../env'

import chevLeft from '../../../public/icons/chevLeft.png';
import chevRight from '../../../public/icons/chevRight.png';
import cart from '../../../public/icons/cart.png';

const host = env.SERVER_BASE_URL;

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
    const imageSrc = `${host}/public/${props.id}.jpg`
    
    return (
        <div className='itemContainer' data-testid={"product" + props.id}>
            <div className='itemImageContainer'>
                <Link to={link} className="productName">{thisProduct.name}</Link>
                <Link to={link}>
                    <img src={imageSrc} className="imgThmb"/>
                </Link>
            </div>
            <div className='itemSelectContainer'>
                <button onClick={() => dispatch(changeItemQuant(false))} role="decrement">
                    <img src={chevLeft}/>
                </button>
                <p role="itemQuantity">{thisItemQuant}</p>
                <button onClick={() => dispatch(changeItemQuant(true))} role="increment">
                    <img src={chevRight}/>
                </button>
                <button onClick={() => dispatch(addToCart(props.id, thisItemQuant, thisProdUnitPrice))}>
                    <img src={cart} />
                </button>
            </div>
        </div>
    )
}
