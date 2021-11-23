import React from 'react';
import './app.css';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Products from './components/products/products.js';
import Cart from './components/cart/cart.js'
import Login from './components/login/login.js'
import Dashboard from './components/dashboard/dasboard.js';
import ProductInfoPage from './components/products/productInfoPage.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from './api/api.js';
import { login } from './components/login/loginSlice.js';
import { uploadOrders } from './components/dashboard/dashboardSlice.js';


import { useDispatch } from 'react-redux';
import { getProductsThunk } from './components/products/productsSlice.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App () {
    const dispatch = useDispatch();
    dispatch(getProductsThunk());

    async function onLoadLoginCheck(){
        const loginCheck = await api.checkIfLoggedIn()
        if (loginCheck === 'Not Authorized'){
            return
        } else if (loginCheck === true){
            const orders = await api.getOrderHistory()
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
                            <Products />
                        </Route>

                        <Route path='/cart'>
                            <h2>Cart</h2>
                            <Cart />
                        </Route>

                        <Route path='/products/:product_name'>
                            <ProductInfoPage />
                        </Route>
                        
                        <Route path='/login'>
                            <Login />
                        </Route>

                        <Route path='/dashboard'>
                            <Dashboard />
                        </Route>

                        <Route exact path='*'>
                            <h1>Title</h1>
                            <Products />
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