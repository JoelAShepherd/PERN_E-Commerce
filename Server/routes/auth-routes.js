const express = require('express');
const authRouter = require('express').Router();
const cors = require('cors');
const bcrypt = require('bcrypt')
const pool = require('../database/db');
const jwtGenerator = require('../utils/jwtGenerator')


authRouter.use(express.urlencoded({ extended: false}))

const clientPage = 'http://localhost:8080'

authRouter.use(cors())


//register new user
authRouter.post('/register', async (req, res) => {
    console.log('Server recieves POST to register new user')
    try {
        //console.log('Req Body :', req.body)
        const { name, email, password } = req.body;
        

        //check if user already exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", 
        [email])

        if (user.rows.length !== 0){
            return res.status(401).send("User already exists")
        }

        //bcrypt the password
        const hashedPW = await bcrypt.hash(password, 10)


        //add user to db
        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_pass) VALUES($1, $2, $3) RETURNING *',
        [name, email, hashedPW]);
        
            //res.json(newUser.rows[0]).status(201).send()
        
        //generate jwt token
        
        const token = jwtGenerator(newUser.rows[0].user_id)
        console.log('Token: ', token)

        res.json({token})
        
    } catch(error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

//auth login
authRouter.post('/login', async (req, res) => {
    //log into pg user system
    console.log('Server reieves login POST request')
    try{
        //destructure req.body

        const { email, password } = req.body;
    

        //check if user exists; if not throw error

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0){
            return res.status(401).json("Email or password is incorrect")
        }

        //check if incoming password is same as db pass
        
        const validPass = await bcrypt.compare(password, user.rows[0].user_pass)

        console.log("Valid pass? ", validPass)

        if (!validPass){
            return res.status(401).json("Email or password is incorrect")
        }

        //issue jwt
        const token = jwtGenerator(user.rows[0].user_id)
        console.log('Token: ', token)

        res.json({token})


    } catch(error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
    
})




//auth with google
authRouter.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with google')
})

module.exports = authRouter;