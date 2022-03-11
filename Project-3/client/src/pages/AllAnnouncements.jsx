import React from 'react';
import Announcements from '../components/Announcements/Announcements';
import Searchbar from '../components/Searchbar/Searchbar';
import { Link } from 'react-router-dom';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';
import Navbar from '../components/Navbar/Navbar';

function AllAnnouncements(props) {
    return (
        <div className='margin-top'>
        <div className="flex-center">
            <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
            <Link exact to="/main"> Go back</Link>
        </div>
            <h1>Check all the announcements</h1>
            <ScrollUpBtn />
            <Searchbar />
            <Announcements />
            <Navbar />
        </div>
    );
}

export default AllAnnouncements;