import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartQuantity, selectCartTotalPrice } from './cart/cartSlice.js';
import HeaderLoginButton from './login/headerLoginButton.js';

export default function Header () {
    const cartQuant = useSelector(selectCartQuantity)
    const cartTotal = useSelector(selectCartTotalPrice)
    

    return (
        <div className='header'>
            <Link to='/'>
                <h1>PERNstore</h1>
            </Link>
            <div className='headerContent'>
                <HeaderLoginButton />
                <Link to='/cart' className="cartInHeader">
                    <div className='cart'>
                        <span>Cart:</span>
                        <div className='cartCountCont'>
                            <div className='cartcount'>
                                <span>{cartQuant}</span>
                            </div>
                        </div>
                        <div className='cartsum'>
                            <span>£{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}