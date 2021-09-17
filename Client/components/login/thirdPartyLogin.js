import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";

const handleClick = async() => {
    const googleLoginURL = 'http://localhost:5000/google/login'
    const newWindow = window.open(googleLoginURL, 
                                "_blank", "width=500, height=600")
}

const ThirdPartyLogin = () => {
    return(
        <GoogleButton onClick={handleClick}/>
    )
}

export default ThirdPartyLogin;

/* 
<div className='thirdPartyContainer'>
            <a href='http://localhost:5000/google/login'>Log in with Google</a>
        </div>

*/