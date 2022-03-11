import React from 'react';
import { Link } from 'react-router-dom';
import Events from '../components/Events/Events'
import Navbar from '../components/Navbar/Navbar';
import Searchbar from '../components/Searchbar/Searchbar';

function AllEvents(props) {
    return (
        <div>
            <h1>Check all the events</h1>
            <Searchbar/>
            <Events />
            <Link exact to="/events/create-event">Create an event</Link>
            <Events />
            <Navbar />
        </div>
    );
}

export default AllEvents;