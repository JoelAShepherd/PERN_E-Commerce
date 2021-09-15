import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartQuantity, selectCartTotalPrice } from './cart/cartSlice';
import { selectLoginStatus } from './login/loginSlice';

export default function Header () {
    const cartQuant = useSelector(selectCartQuantity)
    const cartTotal = useSelector(selectCartTotalPrice)
    const loggedIn = useSelector(selectLoginStatus)

    let logInButton;

    if (loggedIn) {
        logInButton = 'My Dashboard'
    } else {
        logInButton = 'Login'
    }

    return (
        <div className='header'>
            <Link to='/'>
                <h1>PERN store</h1>
            </Link>
            <div className='headerContent'>
                <div className='login'>
                    <Link to='/login'>
                        {logInButton}
                    </Link>
                </div>
                <Link to='/cart'>
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