import { createSlice } from "@reduxjs/toolkit";

export const fakeAPISlice = createSlice({
    name: 'products',
    initialState: {
        products: [
            {id:1, name: "Beans", unitPrice: 1.50, quantInStock: 100},
            {id:2, name: "Potatoes", unitPrice: 2.50, quantInStock: 200},
            {id:3, name: "Ham", unitPrice: 2.00, quantInStock: 100},
            {id:4, name: "Spinach", unitPrice: 1.15, quantInStock: 100},
            {id:5, name: "Pepsi", unitPrice: 1.65, quantInStock: 100}
        ]
    },
    reducers: {}
})

export function getUnitPrice(state, unitID){
    let product = state.products.products.find(({id}) => id == unitID)
    return product.unitPrice;
}

//export const selectProducts = state => state.products.products;

export default fakeAPISlice.reducer