import { configureStore } from '@reduxjs/toolkit';
import items from './components/item/itemsSlice';
import cart from './components/cart/cartSlice';
import products from './api/fakeAPI';

export const store = configureStore({
    reducer: {
       items: items,
       cart: cart,
       products: products
    }
})