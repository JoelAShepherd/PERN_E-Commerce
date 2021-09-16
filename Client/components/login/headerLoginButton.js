import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginStatus } from './loginSlice';
import { logout } from "./loginSlice";
import { Link, Redirect } from "react-router-dom";



export default function HeaderLoginButton() {
    const dispatch = useDispatch()
    const loggedIn = useSelector(selectLoginStatus)

    const handleLogout = () => {
        console.log('Handling logout')
        dispatch(logout());
        localStorage.removeItem('token')
        
    }

    if (loggedIn){
        return (
            <div className='login'>
                <Link to='/login'>
                    My Dashboard
                </Link>
                <a href='#' onClick={handleLogout}>Logout</a>
            </div>
        )
    }

    return (
        <div className='login'>
            <Link to='/login'>
                Log in
            </Link>
        </div>
    )
}



