import React from 'react'


const CustomerOrder = (order) =>{
    const { order_id, order_date, cost, order_status } = order.order;
    const items = order.order.json_items_ordered.items;
    console.log('Order object recieved: ', order)
    return(
        <tr className='orderContainer'>
            <td>{order_id}</td>
            <td>{order_date}</td>
            <td className='orderItemsContainer'>
                {(items.map((item, index) => <OrderItem key={index} item={item} />))}
            </td>
            <td>{cost}</td>
            <td>{order_status}</td>
        </tr>
    )
}

export default CustomerOrder;