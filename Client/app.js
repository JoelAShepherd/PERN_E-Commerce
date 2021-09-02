import React from 'react';
import './app.css';
import Header from './components/header';
import Footer from './components/footer';
import Products from './components/products/products';
import Cart from './components/cart/cart'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App () {
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
                    </Switch> 
                </div>
                <Footer />
            </div>
        </Router>
    )
}

export default App;