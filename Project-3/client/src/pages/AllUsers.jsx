import React from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import Users from '../components/Users/Users';
import { Link } from 'react-router-dom';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';
import Navbar from '../components/Navbar/Navbar';

function AllProfiles(props) {
    return (
        <div className='margin-top'>
        <div className="flex-center">
            <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
            <Link exact to="/main"> Go back</Link>
        </div>
            <h1>Check all the profiles</h1>
            <ScrollUpBtn />
            <Searchbar/>
            <Users />
            <Navbar />
        </div>
    );
}

export default AllProfiles;