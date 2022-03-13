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
            
                <img src="../../../plus.png" alt="home" className='home-icon' onClick={popUp}/>
                
            
            <Link exact to="/main"><img src="../../../home-icon.png" alt="home" className='home-icon'/> </Link>
            <Link exact to="/profile"><img src="../../../user-profile.png" alt="profile" className='home-icon'/></Link>
        </div>
    );
}

export default Navbar;