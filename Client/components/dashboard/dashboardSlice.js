import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        orders: null
    
    },
    reducers: {
        uploadOrders(state, action){
            state.orders = action.payload
        },
        clearOrders(state){
            state.orders=null;
        }
    }
})

export const selectOrders = state => state.dashboard.orders;
export const { uploadOrders, clearOrders } = dashboardSlice.actions;
export default dashboardSlice.reducer;