import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: []
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



export const selectItems = state => state.items.items;
export const selectItemsState = state => state.items;
export const {addItem} = itemsSlice.actions;


export default itemsSlice.reducer;