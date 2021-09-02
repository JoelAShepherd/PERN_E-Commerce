import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        test: 4,
        items: [
            {id:"1", name: 'beans', quantInComp: 1},
            {id:"2", name: 'beans2', quantInComp: 2}
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
export const selectTest = state => state.items.test;

export const {addItem} = itemsSlice.actions;

export default itemsSlice.reducer;