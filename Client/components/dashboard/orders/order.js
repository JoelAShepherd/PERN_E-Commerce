import React from 'react'
import OrderItem from './orderItem';

const CustomerOrder = (order) =>{
    const { order_id, order_date, cost, order_status } = order.order;
    const items = order.order.json_items_ordered.items;
    console.log('Order object recieved: ', order)
    return(
        <div className='orderContainer'>
            <p>One order</p>
            <p>{order_id}</p>
            <p>{order_date}</p>
            {(items.map((item, index) => <OrderItem key={index} item={item} />))}
            <p>{cost}</p>
            <p>{order_status}</p>
        </div>
    )
}

export default CustomerOrder;