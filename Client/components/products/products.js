import React from 'react';
import Item from '../item/item';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectProductsState, getProductsThunk } from './productsSlice';



export default function Products () {
    const dispatch = useDispatch();
    console.log('products OK');
    dispatch(getProductsThunk);
    const productsArr = useSelector(selectProducts)
    const productsState = useSelector(selectProductsState);

    const error = productsState.resultsError;
    const loading = productsState.resultsLoading;
    const hasData = productsState.data;

    
    return(
        <div className='outerProductsContainer'>

            {hasData ? (productsArr.map((product, index) => 
                <Item id={product.id} key={index}/>
                )) :
                loading ? (<h3>Loading...</h3>) : error? (<h3>Hmmm.... an error occured</h3>) : <h3>Welcome</h3>
            }
        </div>
    )
}


