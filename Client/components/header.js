import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartQuantity, selectCartTotalPrice } from './cart/cartSlice';
import HeaderLoginButton from './login/headerLoginButton';

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
                        Cart
                        <div className='cartCountCont'>
                            <div className='cartcount'>{cartQuant}</div>
                        </div>
                        <div className='cartsum'>£{cartTotal.toFixed(2)}</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}