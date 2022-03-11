import React from 'react';
import { Link } from 'react-router-dom';
import Events from '../components/Events/Events'
import Navbar from '../components/Navbar/Navbar';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';
import Searchbar from '../components/Searchbar/Searchbar';

function AllEvents(props) {
    return (
        <div className='margin-top'>
            <div className="flex-center">
                <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
                <Link exact to="/main"> Go back</Link>
            </div>
            <h1>Check all the events</h1>
            <ScrollUpBtn />
            <Searchbar/>
            <Link exact to="/events/create-event">Create an event</Link>
            <Events />
            <Navbar />
        </div>
    );
}

export default AllEvents;