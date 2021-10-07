
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
            parsedRes.sort((a, b) => {
                return b.order_id - a.order_id;
            })
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

    //process payment and order
    async payment(totalToPay, id, order){
        const date = this.getDate();
        console.log("API payment called");
        console.log("DATE: ", date);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5000/pay', 
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
                console.log("SUCCESS!!!");
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
          console.log("RespJson: ", respJson );
          return respJson;
      },

      getDate(){
          const date = new Date();
          const year = date.getFullYear();
          let month = date.getMonth();
            if(month <10){
                month = "0" + month;
            }
          let day = date.getDay();
            if(day <10){
                day = "0" + day;
        }
          const stringDate = `${year}-${month}-${day}`;
          return stringDate;
      }



    };

