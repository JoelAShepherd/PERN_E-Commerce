import axios from "axios";
import { toast } from "react-toastify";
import { env } from '../env.js'

const root = env.SERVER_BASE_URL

export const api = {

    //Return array of products in the database
    async getProducts(){
        try{
            const response = await axios.get((root + '/products'));
            if (response.statusText === "OK"){
                return response.data;
            }
            throw new Error('Request to sever 5000 failed at api request');
        } catch (err){
            console.log(err);
        }
    },




    //Add a new user to the database
    async registerUser(name, email, password){
        
        try{
            const newUser = {name: name, email: email, password:password};
            const regResponse = await fetch(root + '/auth/register', {
            'method': 'POST',
            'headers': {
              'Content-type': 'application/json'
            },
            'body': JSON.stringify(newUser)
            })
            const parseRegResponse = await regResponse.json()

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
        const userCreds = {email: email, password: password}
        
        try{
            const response = await fetch(root + '/auth/login', {
                'method': 'POST',
                'headers': {
                    'Content-type': 'application/json'
                  },
                  'body': JSON.stringify(userCreds)
            })
            const parseRes = await response.json();

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
        
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(root + '/dashboard', {
                'method': 'GET',
                'headers': {
                    'token': token
                }
            })
            const parsedRes = await response.json();
            return parsedRes

        } catch(err){
            console.log(err)
        }
    },

    //get order history from the db using the token 
    async getOrderHistory(){

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(root + '/dashboard/orders', {
                'method': 'GET',
                'headers': {
                    'token': token
                }
            })

            const parsedRes = await response.json()
            parsedRes.sort((a, b) => {
                return b.order_id - a.order_id;
            })
            const transformedRes = this.transformAllOrderData(parsedRes)
            return transformedRes

        } catch(err){
            console.log(err.message)
        }
    },

    //on page load check if the user is already logged in
    async checkIfLoggedIn(){

        try{  
            const token = localStorage.getItem('token')
            const response = await fetch(root + '/auth/verify',
            {
                'method': 'GET',
                'headers': {
                    'token': token
                }
            })

            const parsedRes = await response.json()
            return parsedRes;

        } catch(err){
            console.log(err.message)
        }
    },

    //process payment and order
    async payment(totalToPay, id, order){
        const date = this.getDate();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(root + '/pay', 
            {
                'method': 'POST',
                'headers': {
                    'amount': totalToPay,
                    'id': id,
                    'order': order,
                    'orderdate': date,
                    'token': token
                }
            })
            const parsedResponse = await response.json();
            
            if (parsedResponse.success){
                const newOrderHist = await this.getOrderHistory();
                const paymentResponse =
                {
                    "success": true, 
                    "newOrderHistory": [...newOrderHist]
                }
                return paymentResponse;
            }
            return parsedResponse;
        } catch (error) {
            console.log("API payment error:", error);
        }
    },

    

    transformSingleOrderData(order){
          const {order_id, order_date, cost, order_status} = order
         const rawItems = order.json_items_ordered.items
         let formatedItems = []
         rawItems.forEach(item => {
           formatedItems.push(`${item.product_name}: ${item.quantity}`)
         })
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
        let transformedOrders = [];
        ordersFetched.forEach(order => {
          transformedOrders.push(this.transformSingleOrderData(order))
        })

        return transformedOrders;
    },
      
    transformDate(date_string){
          const year = date_string.slice(0,4)
          const month = date_string.slice(5, 7)
          const day = date_string.slice(8, 10)

          return `${day}/${month}/${year}`
    },

    transformCost(cost){
          const costInPounds = cost / 100

          return `£${costInPounds.toFixed(2)}`
    },

    //insert the array of cartitems and of products
    transformOrderForDB(cartItems, products){
          let respJson = {"items": []};
          cartItems.forEach(item => {
              const product = products.find(prod => {
                  return prod.product_id === item.id;
              })
              const newItem = {"product_id": item.id, 
                                "product_name": product.name,
                                "quantity": item.quantity
                            }
                respJson.items.push(newItem)
          });
          respJson = JSON.stringify(respJson)
          
          return respJson;
    },

    getDate(){
          const date = new Date();
          const year = date.getFullYear();
          let month = date.getMonth();
            if(month <10){
                month = "0" + month;
            }
          let day = date.getDate();
            if(day <10){
                day = "0" + day;
        }
          const stringDate = `${year}-${month}-${day}`;

          return stringDate;
    }



};

