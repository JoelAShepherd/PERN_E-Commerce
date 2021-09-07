import React, { useEffect } from 'react';
import Item from '../item/item';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectProductsState} from './productsSlice';
import { addItem, selectItemsState, selectItems } from '../item/itemsSlice';



export default function Products () {
    const dispatch = useDispatch();
    console.log('products OK');
    

    

    const productsArr = useSelector(selectProducts)
    const productsState = useSelector(selectProductsState);
    const itemsState = useSelector(selectItemsState)
    const items = useSelector(selectItems)

    console.log('******* ITEMS state pre POP', itemsState)
    console.log('* Items arr', items)



    const error = productsState.resultsError;
    const loading = productsState.resultsLoading;
    const hasData = productsState.data;

    const addItemToStore = (productID) => {
        let item = {id: productID, quantInComp: 5}
        dispatch(addItem(item));
    }

    const populateStore = arr => {
        for(let i=0; i< arr.length; i++){
            if (items.find(({id})=> id === arr[i].product_id)){
                return
            } else {
                addItemToStore(arr[i].product_id)
            }
        }
        console.log('******* ITEMS AFTRE POP', items)
    }

    
    return(
        <div className='outerProductsContainer'>

            {hasData ? populateStore(productsArr) : <p>no data yet</p>}

            {hasData ? (productsArr.map((product, index) => 
                <Item id={product.product_id} key={index} />
                )) :
                loading ? (<h3>Loading...</h3>) : error? (<h3>Hmmm.... an error occured</h3>) : 
                <div>
                    <h3>Welcome</h3>
                    
                </div>
            }
        </div>
    )
}


