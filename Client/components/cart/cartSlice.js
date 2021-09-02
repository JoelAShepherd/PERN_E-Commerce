import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [
            {id: 2, quantity: 6}
        ],
        totalItems: 0,
        totalPrice: 0
    },
    reducers: {
        addItemsToCart(state, action){
            let itemToAdd = state.cartItems.find(({id}) => id == action.payload.id);
            if (itemToAdd) {
                itemToAdd.quantity += action.payload.quantity
            }
            else {
                state.cartItems.push({id: action.payload.id, quantity: action.payload.quantity})
            }
        }
    }
})

export const selectCartItems = state => state.cart.cartItems;

export default cartSlice.reducer;