import React from "react";

export default function CartHeader() {
    return(
        <div className="cartHeaderCont">
            <div className="CHProdCont">
                <p>Product</p>
            </div>
            <div className="CHQuantCont">
                <p>Quantity</p>
            </div>
            <div className="CHUPriceCont">
                <p>Price</p>
            </div>
            <div className="CHSubCont">
                <p>Subtotal</p>
            </div>
        </div>
    )
}