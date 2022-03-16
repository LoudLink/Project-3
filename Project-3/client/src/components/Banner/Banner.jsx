import React, { useContext, useEffect } from 'react';
import "./Banner.css"
import { Link } from 'react-router-dom';
import ScrollUpBtn from '../ScrollUpBtn/ScrollUpBtn';
import { AuthContext } from '../../context/auth.context';

function Banner() {

    const {isLoggedIn} = useContext(AuthContext);

    useEffect(()=>{
        
        const imageLogo = document.getElementById("LLLogo");
        
        
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
        {isLoggedIn ? (<Link exact="true" to="/main"> <img id="LLLogo" src='../../../LoudLink Logo.png' alt="logo" className='hlogo' /></Link>) : (<Link exact="true" to="/"><img id="LLLogo" src='../../../LoudLink Logo.png' alt="logo" className='hlogo' /></Link>)}
            
            </div>
            <ScrollUpBtn />
        </div>
    );
};

export default Banner;