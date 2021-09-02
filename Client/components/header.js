import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartQuantity } from './cart/cartSlice';

export default function Header () {
    const cartQuant = useSelector(selectCartQuantity)

    return (
        <div className='header'>
            <Link to='/'>
                <h1>PERN store</h1>
            </Link>
            <div className='headerContent'>
                <div className='login'>login</div>
                <Link to='/cart'>
                    <div className='cart'>
                        Cart
                        <div className='cartCountCont'>
                            <div className='cartcount'>{cartQuant}</div>
                        </div>
                        <div className='cartsum'>£1.50</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}