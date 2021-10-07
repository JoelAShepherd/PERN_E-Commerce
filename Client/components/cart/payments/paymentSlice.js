import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentProcessStarted: false,
        paymentSuccess: false
    },
    reducers: {
        startPaymentProcess(state) {
            state.paymentProcessStarted = true,
            state.paymentSuccess = false
        },
        paymentSuccess(state) {
            state.paymentProcessStarted = false,
            state.paymentSuccess = true
        },
        resetPaymentState(state){
            state.paymentProcessStarted = false,
            state.paymentSuccess = false
        }
    }
})

export const selectPaymentProcessStarted = state => state.payment.paymentProcessStarted;
export const selectPaymentSuccess = state => state.payment.paymentSuccess;
export const {startPaymentProcess, paymentSuccess, resetPaymentState} = paymentSlice.actions;

export default paymentSlice.reducer;