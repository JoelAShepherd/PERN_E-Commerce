import React, { useEffect } from 'react';
import Item from '../item/item';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectProductsState} from './productsSlice';



export default function Products () {
    const dispatch = useDispatch();
    console.log('products OK');
    

    

    const productsArr = useSelector(selectProducts)
    const productsState = useSelector(selectProductsState);

    const error = productsState.resultsError;
    const loading = productsState.resultsLoading;
    const hasData = productsState.data;

    
        
    

    const handleClickPlus = () => {
        dispatch({type: 'products/increment'})
    }

    const handleClickMinus = () => {
        dispatch({type: 'products/decrement'})
    }

    
    return(
        <div className='outerProductsContainer'>

            {hasData ? (productsArr.map((product, index) => 
                <Item id={product.product_id} key={index} />
                )) :
                loading ? (<h3>Loading...</h3>) : error? (<h3>Hmmm.... an error occured</h3>) : 
                <div>
                    <h3>Welcome</h3>
                    <p>loading: {String(loading)}</p>
                    <p>error: {String(error)}</p>
                    <p>hasData: {String(hasData)}</p>
                    <button onClick={handleClickPlus}>test++</button>
                    <button onClick={handleClickMinus}>test--</button>
                </div>
            }
        </div>
    )
}


