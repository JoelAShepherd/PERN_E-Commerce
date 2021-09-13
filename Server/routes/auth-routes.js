const express = require('express');
const authRouter = require('express').Router();
const cors = require('cors');
const bcrypt = require('bcrypt')
const pool = require('../database/db');


authRouter.use(express.urlencoded({ extended: false}))

const clientPage = 'http://localhost:8080'

authRouter.use(cors())


//auth login
authRouter.get('/login', (req, res) => {
    //log into pg user system
    
})

//register new user
authRouter.post('/register', async (req, res) => {
    try {
        console.log('server recives POST to register user')
        console.log('Req Body :', req.body)
        const { name, email, password } = req.body;
        const hashedPW = await bcrypt.hash(password, 10)
        //add user to db
        pool.query('INSERT INTO users (user_name, user_email, user_pass) VALUES($1, $2, $3)',
        [name, email, hashedPW], (error, results) => {
            if(error){
                console.log(error.message)
            } 

            res.status(201).send(results)
        }
        
        )
        
    } catch(error) {
        console.log(error)
    }
})



//auth with google
authRouter.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with google')
})

module.exports = authRouter;