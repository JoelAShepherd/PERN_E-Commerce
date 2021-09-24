import React from "react";

const OrdersHeader = () => {
    

    return(
        <div className='orderContainer'>
            <div className='orderColumn oHHeader'>
            <p>Order ID</p>
            </div>
            <div className='orderColumn oHHeader'>
                <p>Date</p>
            </div>
            <div className='orderColumn oHHeader'>
                <p>Items</p>
            </div>
            <div className='orderColumn oHHeader'>
                <p>Cost</p>
            </div>
            <div className='orderColumn oHHeader'>
                <p>Order status</p>
            </div>
        </div>
    )
}

export default OrdersHeader