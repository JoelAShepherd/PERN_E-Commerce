import { createSlice } from "@reduxjs/toolkit";


export const loginSlice = createSlice({
    name: 'login',
    initialState: { 
        loggedIn: false,
        name: null
    },
    reducers: {
        login(state, action) {
            state.loggedIn = true,
            state.name = action.payload
        },
        logout(state) {
            state.loggedIn = false,
            state.name = null
        }
    }
})


export const selectLoginState = state => state.login;
export const selectLoginStatus = state => state.login.loggedIn;
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
