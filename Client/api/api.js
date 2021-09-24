
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
            if (parseRegResponse === 'Invalid Email'){
                toast('The email address you provided is invalid, please try again')
                return false;
            }
            if (parseRegResponse === 'Missing Credentials'){
                return false;
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
            const parsedRes = await response.json();
            console.log('Username from API: ', parsedRes)
            return parsedRes
        } catch(err){
            console.log(err)
        }
    },

    //get order history from the db using the token 
    async getOrderHistory(){
        console.log('api getOrderHistory called')

        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:5000/dashboard/orders', {
                'method': 'GET',
                'headers': {
                    'token': token
                }
            })

            const parsedRes = await response.json()
            console.log('OH response from API: ', parsedRes)
            const transformedRes = this.transformAllOrderData(parsedRes)
            console.log('Transformed res: ', transformedRes)
            return transformedRes
        } catch(err){
            console.log(err.message)
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
            const parsedRes = await response.json()
            
            console.log('API checkifloggedin result', parsedRes)
            
            return parsedRes;

        } catch(err){
            console.log(err.message)
        }
    },

    transformSingleOrderData(order){
        console.log('transform single order called');
          const {order_id, order_date, cost, order_status} = order
         const rawItems = order.json_items_ordered.items
         console.log('Raw Items: ', rawItems)
         let formatedItems = []
         rawItems.forEach(item => {
           formatedItems.push(`${item.product_name}: ${item.quantity}`)
         })
         console.log('formated items', formatedItems)
         const formatedOrder = {
           'order_id': order_id,
           'json_items_ordered': formatedItems,
           'order_date': order_date,
           'cost': cost,
           'order_status': order_status
         }
    
         return formatedOrder
      },

      transformAllOrderData(ordersFetched){
        console.log('Transform all orders called')
        let transformedOrders = [];
        ordersFetched.forEach(order => {
          transformedOrders.push(this.transformSingleOrderData(order))
        })
        console.log('Transformed Orders: ', transformedOrders)
        return transformedOrders;
      } 


};

console.log('api self-check', api.getProducts())