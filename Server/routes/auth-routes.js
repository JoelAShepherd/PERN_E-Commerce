const { Router } = require('express');

const authRouter = require('express').Router();


//auth login
authRouter.get('/login', (req, res) => {
    //log into pg user system
    res.send('Logging in pg')
})

//register new user
authRouter.post('/register', (req, res) => {
    //handle registration
})

//auth logout
authRouter.get('/logout', (req, res) => {
    //handle with passport
    res.send('logging out')
})



//auth with google
authRouter.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with google')
})

module.exports = authRouter;