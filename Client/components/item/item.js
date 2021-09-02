import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTest, upTest, downTest } from './itemsSlice';

export default function Item (props) {
    const testVal = useSelector(selectTest)
    const dispatch = useDispatch();


    return (
        <div className='itemContainer'>
            <div className='itemImageContainer'>
                <p>{props.id}</p>
                <img src='beans.jpg'></img>
            </div>
            <div className='itemSelectContainer'>
                <button  onClick={() => dispatch(downTest())}>
                    <img src='icons/chevLeft.jpg'/>
                </button>
                    <p>{testVal}</p>
                <button onClick={() => dispatch(upTest())}><img src='icons/chevRight.jpg'/></button>
                <img src='icons/cart.png' />
            </div>
        </div>
    )
}