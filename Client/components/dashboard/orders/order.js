import React from 'react'
import { api } from '../../../api/api';


const CustomerOrder = (order) =>{
    const { order_id, order_date, cost, order_status } = order.order;
    const items = order.order.json_items_ordered;
    const formatedDate = api.transformDate(order_date)
    const formatedCost = api.transformCost(cost)
    return(
        <div className='orderContainer'>
            <div className='orderColumn'>
            <   p>{order_id}</p>
            </div>
            <div className='orderColumn'>
                <p>{formatedDate}</p>
            </div>
            <div className='orderItemsContainer orderColumn'>
                {(items.map((item, index) => <p key={index}>{item}</p>))}
            </div>
            <div className='orderColumn'>
                <p>{formatedCost}</p>
            </div>
            <div className='orderColumn'>
                <p>{order_status}</p>
            </div>
        </div>
    )
}

export default CustomerOrder;