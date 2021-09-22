import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        orders: []
    },
    reducers: {
        uploadOrders(state, action){
            state.orders.push(action.payload);
        },
        clearOrders(state){
            state.orders=[];
        }
    }
})

export const selectOrders = state => state.dashboard.orders;
export const { uploadOrders, clearOrders } = dashboardSlice.actions;
export default dashboardSlice.reducer;