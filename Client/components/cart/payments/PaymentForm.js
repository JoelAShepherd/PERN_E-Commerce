import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalPrice, selectCartOrder } from '../cartSlice.js';
import { api } from '../../../api/api.js';
import { uploadOrders } from '../../dashboard/dashboardSlice.js';
import { paymentSuccess } from './paymentSlice.js';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#39f",
			color: "#000",
            backgroundColor: "#bebebe",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "24px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#fff" }
		},
		invalid: {
			iconColor: "#f44336",
			color: "#f44336"
		}
	}
}

export default function PaymentForm() {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const cartTotal = useSelector(selectCartTotalPrice)
    const totalToPay = ((cartTotal.toFixed(2))*100).toFixed();
    const order = useSelector(selectCartOrder);
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })

        if(!error){
            try {
                const {id} = paymentMethod;
                
                const response = await api.payment(totalToPay, id, order)

                if(response.success){
                    dispatch(uploadOrders(response.newOrderHistory));
                    dispatch(paymentSuccess())                    
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
