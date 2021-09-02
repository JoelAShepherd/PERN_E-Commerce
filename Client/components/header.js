import React from 'react';
import { Link } from 'react-router-dom';

export default function Header () {
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
                            <div className='cartcount'>5</div>
                        </div>
                        <div className='cartsum'>£1.50</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}