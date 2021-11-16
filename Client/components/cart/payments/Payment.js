import React from "react";
import { withRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.js";

const Payment = () => {
    const public_key = "pk_test_qblFNYngBkEdjEZ16jxxoWSM";
    const stripePromise = loadStripe(public_key)



    return (
        <div className='paymentsContainer'>
            <h3>Payments</h3>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    )
}

export default withRouter(Payment);