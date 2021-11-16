import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import items from './components/item/itemsSlice.js';
import cart from './components/cart/cartSlice.js';
import products from './components/products/productsSlice.js';
import login from './components/login/loginSlice.js';
import dashboard from './components/dashboard/dashboardSlice.js';
import payment from './components/cart/payments/paymentSlice.js';

export const store = configureStore({
    reducer: {
       items: items,
       cart: cart,
       products: products,
       login: login,
       dashboard: dashboard,
       payment: payment
    },
    middleware: [thunk]
})

