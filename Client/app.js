import React from 'react';
import './app.css';
import Header from './components/header';
import Footer from './components/footer';


function App () {
    return (
        <div className="App">
            <Header />
            <div className='mainContent'>
                <h1>Title</h1>
                <p>Here we go!</p>
                <p>Here we go again!</p>
            </div>
            <Footer />
        </div>
    )
}

export default App;