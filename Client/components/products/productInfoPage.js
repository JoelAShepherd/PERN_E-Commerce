 import React, { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from './productsSlice';
import { useParams } from 'react-router-dom';
import { addToCart } from '../cart/cartSlice';
import { toast } from 'react-toastify';

import chevLeft from '../../../public/icons/chevLeft.png';
import chevRight from '../../../public/icons/chevRight.png';
import cart from '../../../public/icons/cart.png';




 
 export default function ProductInfoPage() {
     const dispatch = useDispatch();
     const productsArr = useSelector(selectProducts);
     

     const { product_name } = useParams();
     const thisProduct = productsArr.find((prod) => prod.name === product_name)
     const {product_id, name, unit_price, description} = thisProduct;
     

     const [itemQuant, setItemQuant] = useState(1);
     const increment = () => {
         if (itemQuant < 10){
            setItemQuant(itemQuant + 1);
         }
     }
     const decrement = () => {
         if (itemQuant > 1 ){
            setItemQuant(itemQuant - 1);
         }
     }

     const subTotal = (Math.round(unit_price * itemQuant * 100) /100).toFixed(2);

     const imageSrc = `http://localhost:5000/public/${product_id}.jpg`

     return (
         <div>
            <h2>{name}</h2>
            <img src={imageSrc}/>
            <p>£{unit_price}</p>
            <div className='itemSelectContainer'>
                <button onClick={decrement}>
                    <img src={chevLeft}/>
                </button>

                <p>{itemQuant}</p>

                <button onClick={increment}>
                    <img src={chevRight}/>
                </button>

                <p>£{subTotal}</p>

                <button onClick={() =>{ 
                    dispatch(addToCart(product_id, itemQuant, unit_price))
                    toast(`${itemQuant} ${name} added to your cart!`)
                    }}>
                    <img src={cart} />
                </button>
            </div>
            <p>{description}</p>
         </div>
     )
 }
 
/*


*/