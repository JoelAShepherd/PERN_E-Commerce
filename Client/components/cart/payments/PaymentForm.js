import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalPrice, selectCartOrder, clearCart } from '../cartSlice';
import { api } from '../../../api/api';
import { uploadOrders } from '../../dashboard/dashboardSlice';
import { paymentSuccess, selectPaymentSuccess } from './paymentSlice';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#ffd966",
			color: "#666",
            backgroundColor: "#bebebe",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "24px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
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
    const totalToPay = (cartTotal.toFixed(2))*100;
    const order = useSelector(selectCartOrder);
    const paymentAndOrderCompleted = useSelector(selectPaymentSuccess)

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
                    console.log("successful payment")
                    console.log("New OH: ", response.newOrderHistory)
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
