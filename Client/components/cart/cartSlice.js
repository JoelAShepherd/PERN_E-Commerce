import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
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
            state.totalItems += action.payload.quantity;
            state.totalPrice += (action.payload.quantity * action.payload.unitPrice)
        },
        removeItemsFromCart(state, action){
            let itemToChange = state.cartItems.find(({id}) => id == action.payload.id);
            if (!action.payload.all){
                itemToChange.quantity--;
                state.totalItems--;
                state.totalPrice -= action.payload.unitPrice;
            }
            if (action.payload.all || itemToChange.quantity === 0){
                state.totalItems -= itemToChange.quantity;
                state.totalPrice -= (itemToChange.quantity*action.payload.unitPrice);
                let newArr = state.cartItems.filter(({id}) => id !== action.payload.id)
                state.cartItems = newArr;

            }
        }
    }
})

export function addToCart(id, quantity, unitPrice){
    let payload = {
        id: id,
        quantity: quantity,
        unitPrice: unitPrice
    }
    return {
        type: "cart/addItemsToCart",
        payload
    }
}

export function removeFromCart(id, all, unitPrice){
    let payload = {
        id: id,
        all: all,
        unitPrice: unitPrice
    }
    return {
        type: "cart/removeItemsFromCart",
        payload
    }
}

export const selectCartItems = state => state.cart.cartItems;
export const selectCartQuantity = state => state.cart.totalItems;
export const selectCartTotalPrice = state => state.cart.totalPrice;

export default cartSlice.reducer;