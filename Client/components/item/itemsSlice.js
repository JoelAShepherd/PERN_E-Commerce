import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        test: 4,
        items: [
            {id:"1", name: 'beans', quantInComp: 1},
            {id:"2", name: 'beans2', quantInComp: 1}
            //quantInComp is the quantity in the item component that the
            //user can change so as to add that quantity to the basket.
            //It does not represent the quantity in the database. 
        ]
    },
    reducers: {
        addItem(state, action){
            state.items.push(action.payload)
        },
        incrementQuant(state, action){
            const item = state.find(({id}) => id === action.payload.id)
            if (item.quantInComp < 10) {
                item.quantInComp++;
            }
        },
        decrementQuant(state, action){
            const item = state.find(({id}) => id === action.payload.id)
            if (item.quantitySelect > 1) {
                item.quantitySelect--;
            }
        }
    }
})

export const selectItems = state => state.items;
export const selectTest = state => state.items.test;

export const {addItem, incrementQuant, decrementQuant} = itemsSlice.actions;

export default itemsSlice.reducer;