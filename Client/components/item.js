import React from 'react';

export default function Item () {
    return (
        <div className='itemContainer'>
            <div className='itemImageContainer'>
                <img src='beans.jpg'></img>
            </div>
            <div className='itemSelectContainer'>
                <img src='icons/chevLeft.jpg' />
                <p>5</p>
                <img src='icons/chevRight.jpg' />
                <img src='icons/cart.png' />
            </div>
        </div>
    )
}