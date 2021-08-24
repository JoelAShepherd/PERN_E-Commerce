import React from 'react';
import chevLeft from '../../public/icons/chevLeft.jpg';

export default function Item () {
    return (
        <div className='itemContainer'>
            <div className='itemImageContainer'>
                <img src='beans.jpg'></img>
            </div>
            <div className='itemSelectContainer'>
                <img src={chevLeft} />
                
                
            </div>
        </div>
    )
}