import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EventCard from '../components/Events/EventCard'
import { Link } from 'react-router-dom';
import Events from '../components/Events/Events'
import Navbar from '../components/Navbar/Navbar';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';
import Searchbar from '../components/Searchbar/Searchbar';

function AllEvents(props) {
    const[events,setEvents]=useState([])
    const[eventsFiltered,setFilteredEvents]=useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/events`)
        .then((response)=>{
            setEvents(response.data);
            setFilteredEvents(response.data);
        })
        .catch((err)=>console.log(err))
    },[])

    function search(str){
        const strLength = str.length
        const newList = events.slice().filter((el)=> {
        return el.title.slice(0,strLength).toLowerCase() === str.slice(0,strLength).toLowerCase()
        })
        setFilteredEvents(newList)
    }


    return (
        <div className='margin-top'>
            <div className="flex-center">
                <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
                <Link exact= "true" to="/main" className='goback'> Go back</Link>
            </div>
            <h1>Check all the events</h1>
            <ScrollUpBtn />
            <Searchbar filter={search} />
            <Navbar />
            <div className='flex-center-justify'>
                {eventsFiltered.map((event)=>(
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
            <Link to='/events/create-event'><button>Create Event</button></Link>
            
        </div>
    );
}

export default AllEvents;