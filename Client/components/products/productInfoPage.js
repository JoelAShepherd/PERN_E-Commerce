 import React from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from './productsSlice';
import { useParams } from 'react-router-dom';
 
 export default function ProductInfoPage() {
     const { product_name } = useParams();
     const productsArr = useSelector(selectProducts);
     const thisProduct = productsArr.find((prod) => prod.name === product_name)
     const {name, unit_price, description} = thisProduct;
     return (
         <div>
            <h2>{name}</h2>
            <p>£{unit_price}</p>
            <p>{description}</p>
         </div>
     )
 }
 
