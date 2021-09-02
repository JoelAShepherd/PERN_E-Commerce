import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        test: 4,
        items: [
            {id:1, quantInComp: 1},
            {id:2, quantInComp: 2},
            {id:3, quantInComp: 3},
            {id:4, quantInComp: 4},
            {id:5, quantInComp: 5}
            //quantInComp is the quantity in the item component that the
            //user can change so as to add that quantity to the basket.
            //It does not represent the quantity in the database. 
        ]
    },
    reducers: {
        addItem(state, action){
            state.items.push(action.payload)
        },
        changeItem(state, action){
            let item = state.items.find(({id}) => id == action.payload.id)
            if (action.payload.direction){
                if (item.quantInComp < 10){
                    item.quantInComp++;
                }
            }
            if (!action.payload.direction) {
                if (item.quantInComp > 1){
                    item.quantInComp--;
                }
            }
        }
    }
})

console.log(itemsSlice.actions)

export const selectItems = state => state.items;

export default itemsSlice.reducer;