import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginStatus } from './loginSlice';
import { logout } from "./loginSlice";
import { clearOrders } from "../dashboard/dashboardSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



export default function HeaderLoginButton() {
    const dispatch = useDispatch()
    const loggedIn = useSelector(selectLoginStatus)

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearOrders());
        localStorage.removeItem('token')
        toast("You've successfully logged out")
    }

    if (loggedIn){
        return (
            <div className='headerLoginContainer'>
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



