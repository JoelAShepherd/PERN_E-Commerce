import { createSlice } from "@reduxjs/toolkit";


export const loginSlice = createSlice({
    name: 'login',
    initialState: { 
        status: null
    },
    reducers: {}
})


export const selectLoginState = state => state.login;
export const selectLoginStatus = state => state.login.status;
export default loginSlice.reducer;