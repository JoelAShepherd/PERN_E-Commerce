import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        orders: [
            {
              order_id: 8,
              json_items_ordered: 'Apple',
              order_date: '2021-09-22T13:27:49.676Z',
              cost: 1000,
              order_status: 'Pending'
            },
            {
              order_id: 9,
              json_items_ordered: 'Banana',
              order_date: '2021-09-22T13:28:28.495Z',
              cost: 1000,
              order_status: 'Pending'
            }
          ]
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