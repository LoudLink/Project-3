import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"

function Navbar(props) {

    function popUp() {

    }

    return (
        <div className='navbar flex-row flex-center'>
            <button onClick={popUp}>Add</button>
            <button><Link exact to="/main">HOME</Link></button>
            <button><Link exact to="/profile">Profile</Link></button>
        </div>
    );
}

export default Navbar;