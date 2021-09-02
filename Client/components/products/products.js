import React from 'react';
import Item from '../item/item';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../api/fakeAPI';

export default function Products () {
    const productsArr = useSelector(selectProducts)
    console.log(productsArr)


    return(
        <div className='outerProductsContainer'>
            {productsArr.map((product, index) => 
                <Item id={product.id} key={index}/>
                )}
        </div>
    )
}


