import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"

function Navbar(props) {

    const popBtn = document.getElementById('popUp');
    
        function popUp() {
            popBtn.classList.toggle("show");
        }

    return (
        <div className='navbar flex-row flex-center'>

        
            
            <div className='dropup'>
                <img src="../../../plus.png" alt="home" className='drop-btn nav-icon' onClick={popUp}/>
                <div>
                <div className='droup-content' id="popUp">
                    <Link exact= "true" to="/announcements/create-announcement">Create a new announcement</Link>
                    <Link exact= "true" to="/events/create-event">Create a new event</Link>
                </div>
                </div>
            </div>    
            
            <Link exact= "true" to="/main"><img src="../../../home-icon.png" alt="home" className='nav-icon'/> </Link>
            <Link exact= "true" to="/profile"><img src="../../../user-profile.png" alt="profile" className='nav-icon'/></Link>
        </div>
    );
}

export default Navbar;