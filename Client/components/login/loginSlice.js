import { createSlice } from "@reduxjs/toolkit";


export const loginSlice = createSlice({
    name: 'login',
    initialState: { 
        loggedIn: false,
        name: null,
        proceedToPayment: false
    },
    reducers: {
        login(state, action) {
            state.loggedIn = true,
            state.name = action.payload
        },
        logout(state) {
            state.loggedIn = false,
            state.name = null,
            state.proceedToPayment = false
        },
        proceedToPayment(state){
            state.proceedToPayment = true;
        }
    }
})


export const selectLoginState = state => state.login;
export const selectUserName = state => state.login.name;
export const selectLoginStatus = state => state.login.loggedIn;
export const selectProceedToPayment = state => state.login.proceedToPayment;
export const { login, logout, proceedToPayment } = loginSlice.actions;
export default loginSlice.reducer;
