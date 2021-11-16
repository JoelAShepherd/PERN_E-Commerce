import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginStatus } from "./loginSlice.js";
import { api } from "../../api/api.js";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { login } from "./loginSlice.js";

import Dashboard from "../dashboard/dasboard.js";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { uploadOrders } from "../dashboard/dashboardSlice.js";



const Login = () => {
    const dispatch = useDispatch();
    const loginStatus = useSelector(selectLoginStatus)
    const { path } = useRouteMatch();

    const handleSumbitLogin = async (event) => {
        event.preventDefault();
        const { email, password } = event.target;

        try{
            const result = await api.loginUser(email.value, password.value)
            console.log('result in login component', result);
            if (result){
                //get username from database
                const userName = await api.getUserName();
                dispatch(login(userName.user_name))
                
                //get order history from db
                console.log('Getting order history on login')
                const oHist = await api.getOrderHistory()
                dispatch(uploadOrders(oHist))

                toast('Welcome back!')
            }
        } catch(err){
            console.error(err.message);
        }    
        
        
    }

    const handleSubmitRegister = async (event) =>{
        event.preventDefault();
        const { name, email, password } = event.target
        try{
            const result = await api.registerUser(name.value, email.value, password.value)

            if (result){
                dispatch(login(name.value))
            }
        } catch(err){
            console.error(err.message);
        }   
    }
    
    
        
    if (loginStatus){
            try{
                return (
                        <Dashboard />
                )
            } catch(err){
                console.log(err.message)
            }
        }
    

    return(
        <Router>
            <Switch>
                <Route exact path={path}>
                    <div className='loginContainer'>
                        <div className='pgLogin'>
                            <h3>Login</h3>
                            <form onSubmit={handleSumbitLogin}>
                                <div className="inputContainer">
                                    <label htmlFor='email'>Email:</label>
                                    <input type='email' id='email' name='email' required />
                                </div>
                                <div className="inputContainer">
                                    <label htmlFor='password'>Password:</label>
                                    <input type='password' id='password' name='password' required />
                                </div>
                                <button type='submit' className="loginButton">Login</button>
                            </form>
                            
                        </div>
                        <div className="registerLink">
                            <p>Not a user? <Link to='/login/register'>Register here</Link> </p>
                        </div>
                    </div>
                </Route>
                <Route path={`${path}/register`}>
                    <div className='registerContainer'>
                        <h3>Register here</h3>
                        <form onSubmit={handleSubmitRegister}>
                            <div className="inputContainer">
                                <label htmlFor='name'>Name</label>
                                <input type='text' id='name' name='name' required />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' name='email' required />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' required />
                            </div>
                            <button type='submit' className="registerButton">Register</button>
                        </form>
                        <div className="memberLink">
                            <p>Already a member? <Link to='/login'> Log in here</Link></p>
                        </div>
                        
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Login;