import { configureStore } from '@reduxjs/toolkit';
import items from './components/item/itemsSlice';

export const store = configureStore({
    reducer: {
       items: items
    }
})