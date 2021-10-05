import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from '../cartSlice';
import { api } from '../../../api/api';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#555",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const cartTotal = useSelector(selectCartTotalPrice)
    const totalToPay = (cartTotal.toFixed(2))*100;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })

        if(!error){
            try {
                const {id} = paymentMethod;
                //api.payment needs to be written!
                const response = await api.payment(totalToPay, id)

                if(response.ok){
                    console.log("successful payment")
                }
            } catch (error) {
                console.log("Error: ", error)
            }
        } else {
            console.log(error.message)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <input type="submit" value="Pay" />
            </form>
        </div>
    )
}
