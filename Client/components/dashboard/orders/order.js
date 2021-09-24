import React from 'react'


const CustomerOrder = (order) =>{
    const { order_id, order_date, cost, order_status } = order.order;
    const items = order.order.json_items_ordered;
    console.log('Order object recieved: ', order)
    console.log('Items: ', items)
    return(
        <div className='orderContainer'>
            <div className='orderColumn'>
            <   p>{order_id}</p>
            </div>
            <div className='orderColumn'>
                <p>{order_date}</p>
            </div>
            <div className='orderItemsContainer orderColumn'>
                {(items.map((item, index) => <p key={index}>{item}</p>))}
            </div>
            <div className='orderColumn'>
                <p>{cost}</p>
            </div>
            <div className='orderColumn'>
                <p>{order_status}</p>
            </div>
        </div>
    )
}

export default CustomerOrder;