import React from "react";
import { useSelector } from "react-redux";
import { selectLoginStatus } from "./loginSlice";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

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
                        <form action='/auth/register' method='POST'>
                            <div>
                                <label for='name'>Name</label>
                                <input type='text' id='name' name='name' required />
                            </div>
                            <div>
                                <label for='email'>Email</label>
                                <input type='email' id='email' name='email' required />
                            </div>
                            <div>
                                <label for='password'>Password</label>
                                <input type='password' id='password' name='password' required />
                            </div>
                            <button type='submit'>Register</button>
                        </form>
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Login;