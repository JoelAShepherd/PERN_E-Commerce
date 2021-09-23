import React from "react";

const OrderItem = (item) => {
    console.log('Item: ', item)

    const {product_name, quantity} = item.item

    return(
        <div className='orderItemContainer'>
            <p>{product_name}</p>
            <p>{quantity}</p>
        </div>
    )
}

export default OrderItem