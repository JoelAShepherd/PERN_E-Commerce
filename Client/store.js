import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import items from './components/item/itemsSlice';
import cart from './components/cart/cartSlice';
import products from './components/products/productsSlice';
import login from './components/login/loginSlice';
import dashboard from './components/dashboard/dashboardSlice';
import payment from './components/cart/payments/paymentSlice';

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

