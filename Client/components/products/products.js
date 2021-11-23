import React from 'react';
import Item from '../item/item.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectProductsState} from './productsSlice.js';
import { addItem, selectItems } from '../item/itemsSlice.js';



export default function Products () {
    const dispatch = useDispatch();

    const productsArr = useSelector(selectProducts)
    const productsState = useSelector(selectProductsState);
    const items = useSelector(selectItems)


    const error = productsState.resultsError;
    const loading = productsState.resultsLoading;
    const hasData = productsState.data;

    const addItemToStore = (productID) => { //Adds product as item to the store
        let item = {id: productID, quantInComp: 1}
        dispatch(addItem(item));
    }

    const populateStore = arr => {
        for(let i=0; i< arr.length; i++){ // Checks if there is an entry for the product as an item
            if (items.find(({id})=> id === arr[i].product_id)){
                return
            } else { // If no existing entry, adds it to the store
                addItemToStore(arr[i].product_id)
            }
        }
    }

    
    return(
        <div className='outerProductsContainer'>

            {hasData && <h2 data-testid="products">Products</h2>}

            <div className="innerProductsContainer">        
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
        </div>
    )
}


