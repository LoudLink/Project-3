import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/auth.context";

function Navbar(props) {
  const { user, isLoggedIn } = useContext(AuthContext);

  const popBtn = document.getElementById("popUp");


  
  function popUp() {
    popBtn.classList.toggle("show");
  }


    return (
        <div className='navbar flex-row flex-center'>      
            <div className='dropup'>
                <img src="../../../plus.png" alt="home" className='drop-btn nav-icon' onClick={popUp}/>
                <div>
                  {/*<div className='droup-content' id="popUp">
                      <Link exact= "true" to="/announcements/create-announcement">Create a new announcement</Link>
                      <Link exact= "true" to="/events/create-event">Create a new event</Link>
                  </div>*/}
                </div>
            </div>    
            
            <Link exact= "true" to="/main"><img src="../../../home-icon.png" alt="home" className='nav-icon'/> </Link>
            <Link exact= "true" to="/profile"><img src='https://res.cloudinary.com/loudlink/image/upload/v1647284975/loudlink/default_profile_img_n1o8pi.png' alt="profile" className='nav-icon'/></Link>
        </div>
    );

}

export default Navbar;
