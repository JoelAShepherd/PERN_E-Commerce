import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [
            {id: 2, quantity: 6}
        ],
        totalItems: 6,
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
        state.totalItems += action.payload.quantity
        },
        removeItemsFromCart(state, action){
            let itemToChange = state.cartItems.find(({id}) => id == action.payload.id);
            if (!action.payload.all){
                itemToChange.quantity--;
                state.totalItems--;
            }
            if (action.payload.all || itemToChange.quantity === 0){
                state.totalItems -= itemToChange.quantity;
                let newArr = state.cartItems.filter(({id}) => id !== action.payload.id)
                state.cartItems = newArr;

            }
        }
    }
})

export function addToCart(id, quantity){
    let payload = {
        id: id,
        quantity: quantity
    }
    return {
        type: "cart/addItemsToCart",
        payload
    }
}

export function removeFromCart(id, all){
    let payload = {
        id: id,
        all: all
    }
    return {
        type: "cart/removeItemsFromCart",
        payload
    }
}

console.log('cart actions', cartSlice.actions)

export const selectCartItems = state => state.cart.cartItems;
export const selectCartQuantity = state => state.cart.totalItems;

export default cartSlice.reducer;