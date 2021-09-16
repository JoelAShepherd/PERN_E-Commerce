
import { toast } from "react-toastify";

const root = 'http://localhost:5000'

export const api = {

    //Return array of products in the database
    async getProducts(){
        try{
            const response = await fetch((root + '/products'));
            if (response.ok){
                const jsonResponse = await Promise.resolve(response.json());
                return jsonResponse;
            }
            throw new Error('Request to sever 5000 failed at api request');
        } catch (err){
            console.log(err);
        }
    },




    //Add a new user to the database
    async registerUser(name, email, password){
        
        console.log('register user called')
        try{
            const newUser = {name: name, email: email, password:password};
            const regResponse = await fetch('http://localhost:5000/auth/register', {
            'method': 'POST',
            'headers': {
              'Content-type': 'application/json'
            },
            'body': JSON.stringify(newUser)
            })
            const parseRegResponse = await regResponse.json()
            console.log('ParseRegResp: ', parseRegResponse)

            if (parseRegResponse === 'User already exists'){
                toast('A user with that email address already exists')
                return false
            }

            localStorage.setItem('token', parseRegResponse.token)
            toast("You've made a new account!")
            return true
        } catch(err) {
            console.log(err.message)
        }
    },














    //Log in pre-existing user
    async loginUser(email, password){
        console.log('api login called')
        const userCreds = {email: email, password: password}
        
        try{
            const response = await fetch('http://localhost:5000/auth/login', {
                'method': 'POST',
                'headers': {
                    'Content-type': 'application/json'
                  },
                  'body': JSON.stringify(userCreds)
            })
            const parseRes = await response.json();
            console.log('Token in API', parseRes)

            if (parseRes === 'Email or password is incorrect'){
                toast('Email or password is incorrect. Please try again')
                return false
            }
            if (parseRes === 'Invalid Email'){
                toast('Email or password is incorrect. Please try again')
                return false
            }
            if (parseRes === 'Missing Credentials'){
                toast('Please enter all the required information')
                return false
            }

            
           
            localStorage.setItem("token", parseRes.token)
            return true;
            

        } catch(err){
            console.log(err)
        }
         
    },











    //get username from server based on the jwt token provided
    async getUserName(){
        console.log('get user name called in API')
        
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:5000/dashboard', {
                'method': 'GET',
                'headers': {
                    'token': token
                }
            }
            )
            const parseRes = await response.json();
            console.log('Username from API: ', parseRes)
            return parseRes
        } catch(err){
            console.log(err)
        }
    },

    //on page load check if the user is already logged in
    async checkIfLoggedIn(){
        console.log('API checkIfLoggedIn called');
        try{  
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:5000/auth/verify',
            {
                'method': 'GET',
                'headers': {
                    'token': token
                }
            })
            const parseRes = await response.json()
            console.log('API checkifloggedin result', parseRes)
            return parseRes;

        } catch(err){
            console.log(err.message)
        }
    }


};

console.log('api self-check', api.getProducts())