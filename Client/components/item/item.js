import React from 'react';
import { useSelector} from 'react-redux';
import { selectTest } from './itemsSlice';

export default function Item (props) {
    const testVal = useSelector(selectTest)

    return (
        <div className='itemContainer'>
            <div className='itemImageContainer'>
                <p>{props.id}</p>
                <img src='beans.jpg'></img>
            </div>
            <div className='itemSelectContainer'>
                <img src='icons/chevLeft.jpg' />
                <p>{testVal}</p>
                <img src='icons/chevRight.jpg' />
                <img src='icons/cart.png' />
            </div>
        </div>
    )
}