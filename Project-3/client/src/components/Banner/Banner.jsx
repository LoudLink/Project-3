import React, { useEffect } from 'react';
import "./Banner.css"
import { Link } from 'react-router-dom';
import ScrollUpBtn from '../ScrollUpBtn/ScrollUpBtn';

function Banner() {

    useEffect(()=>{
        
        const imageLogo = document.getElementById("LLLogo");
        const imageLogoSmall = document.getElementById("LLLogo-s");
        const thisDiv = document.getElementById('thisDiv');
        const logBtn = document.getElementById('logBtn');
        const signBtn = document.getElementById('signBtn');
        
        function scrollBanner() {
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop  > 400) {
                imageLogo.classList.add("hlogo-s")
                imageLogo.classList.remove("hlogo")

            } else {
                imageLogo.classList.remove("hlogo-s");
                imageLogo.classList.add("hlogo");
            }
        }
        
        window.onscroll = scrollBanner; 
    },[])

    return (
        <div className='navbar-nav navbar-light navbar-expand-lg bg-danger p-4 sticky-top text-center shadow-lg'>
        <div className='text-center' id="thisDiv">
            <img id="LLLogo" src='../../../LoudLink Logo.png' alt="logo" className='hlogo' />
            <Link id="signBtn" exact="true" to={"/signup"} className=" display-6 text-center text-white displayNone btn btn-dark m-2">Signup</Link> 
            <Link id="logBtn" exact="true" to={"/login"} className=" display-6 text-center text-white displayNone btn btn-dark m-2">Login</Link>
            </div>
            <ScrollUpBtn />
        </div>
    );
};

export default Banner;