import React from 'react';

export default function Header () {
    return (
        <div className='header'>
            <h1>PERN store</h1>
            <div className='headerContent'>
                <div className='login'>login</div>
                <div className='cart'>
                    Cart
                    <div className='cartCountCont'>
                        <div className='cartcount'>5</div>
                    </div>
                    <div className='cartsum'>£1.50</div>
                </div>
            </div>
        </div>
    )
}