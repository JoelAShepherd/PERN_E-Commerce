 import React, { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from './productsSlice';
import { selectItems } from '../item/itemsSlice';
import { useParams } from 'react-router-dom';
import { addToCart } from '../cart/cartSlice';

import chevLeft from '../../../public/icons/chevLeft.jpg';
import chevRight from '../../../public/icons/chevRight.jpg';
import cart from '../../../public/icons/cart.png';




 
 export default function ProductInfoPage() {
     const dispatch = useDispatch();
     const productsArr = useSelector(selectProducts);
     const itemsArr = useSelector(selectItems);

     const { product_name } = useParams();
     const thisProduct = productsArr.find((prod) => prod.name === product_name)
     const {product_id, name, unit_price, description} = thisProduct;
     const thisItem = itemsArr.find((item) => item.id === product_id);
     const thisItemQuant = thisItem.quantInComp;

     function changeItemQuant(bool){
        let payload = {
            id: product_id,
            direction: bool
        }
        return {
            type: "items/changeItem",
            payload
        }
     }

     return (
         <div>
            <h2>{name}</h2>
            <p>£{unit_price}</p>
            <div className='itemSelectContainer'>
                <button onClick={() => dispatch(changeItemQuant(false))}>
                    <img src={chevLeft}/>
                </button>

                <p>{thisItemQuant}</p>

                <button onClick={() => dispatch(changeItemQuant(true))}>
                    <img src={chevRight}/>
                </button>

                <button onClick={() => dispatch(addToCart(product_id, thisItemQuant, unit_price))}>
                    <img src={cart} />
                </button>
            </div>
            <p>{description}</p>
         </div>
     )
 }
 
/*


*/