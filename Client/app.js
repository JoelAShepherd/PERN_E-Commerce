import React from 'react';
import './app.css';
import Header from './components/header';
import Footer from './components/footer';
import Products from './components/products/products';
import Cart from './components/cart/cart'
import Login from './components/login/login'
import Dashboard from './components/dashboard/dasboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from './api/api';
import { login } from './components/login/loginSlice';
import { uploadOrders } from './components/dashboard/dashboardSlice';

import { useDispatch } from 'react-redux';
import { getProductsThunk } from './components/products/productsSlice';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App () {
    const dispatch = useDispatch();
    dispatch(getProductsThunk());

    async function onLoadLoginCheck(){
        const loginCheck = await api.checkIfLoggedIn()
        console.log('app level result check', loginCheck)
        if (loginCheck === 'Not Authorized'){
            return
        } else if (loginCheck === true){
            const orders = await api.getOrderHistory()
            console.log('Orders in app on LOGIN: ', orders)
            dispatch(uploadOrders(orders))
            const userName = await api.getUserName();
            dispatch(login(userName.user_name))
        }
    }

    onLoadLoginCheck();

    return (
        <Router>
            <div className="App">
                <Header />
                <div className='mainContent'>
                    <Switch>
                        <Route exact path='/'>
                            <h1>Title</h1>
                            <Products />
                        </Route>
                        <Route path='/cart'>
                            <h2>Cart</h2>
                            <Cart />
                        </Route>
                        
                        <Route path='/login'>
                            <h2>Login</h2>
                            <Login />
                        </Route>
                        <Route path='/dashboard'>
                            <Dashboard />
                        </Route>
                        
                    </Switch> 
                    <ToastContainer position="top-center"
                                    autoClose={3000}
                                    hideProgressBar={true}
                                    closeOnClick 
                                    limit={1}/>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

export default App;