import React from "react";
import { useSelector } from "react-redux";
import { selectLoginStatus } from "./loginSlice";
import { api } from "../../api/api";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";


const serverRegister = 'http://localhost:5000/auth/register'

const handleSubmitRegister = event =>{
    event.preventDefault();
    const { name, email, password } = event.target
    console.log('in submit: ', name.value)
    api.registerUser(name.value, email.value, password.value)
    
}

const Login = () => {
    const status = useSelector(selectLoginStatus)
    const { path } = useRouteMatch();

    return(
        <Router>
            <Switch>
                <Route exact path={path}>
                    <div className='loginContianer'>
                        <div className='pgLogin'>
                            <h3>pgLogin</h3>
                            <form action='/auth/login' method='POST'>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' name='email' required />
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' required />
                            </div>
                            <button type='submit'>Login</button>
                        </form>
                            
                        </div>
                        <div className='thirdPartyLogin'>
                            <h3>3rd Party</h3>
                            
                        </div>
                        <div className='status'>
                            <p>Status: </p>
                            <p>{String(status)}</p>
                        </div>
                        <p>Not a user? <Link to='/login/register'>Register here</Link> </p>
                    </div>
                </Route>
                <Route path={`${path}/register`}>
                    <div className='registerContainer'>
                        <h3>Register here</h3>
                        <form onSubmit={handleSubmitRegister}>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input type='text' id='name' name='name' required />
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' name='email' required />
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' required />
                            </div>
                            <button type='submit'>Register</button>
                        </form>
                        <div>
                            <p>Already a member? <Link to='/login'> Log in here</Link></p>
                        </div>
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Login;