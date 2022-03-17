import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import EventCard from '../components/Events/EventCard'
import { Link } from 'react-router-dom';
import Events from '../components/Events/Events'
import Navbar from '../components/Navbar/Navbar';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';
import Searchbar from '../components/Searchbar/Searchbar';

import UserCard from '../components/UserCard/UserCard';

import { AuthContext } from '../context/auth.context';

function AllEvents(props) {
    const[events,setEvents]=useState([])
    const[eventsFiltered,setFilteredEvents]=useState([])

    const {isLoggedIn} = useContext(AuthContext);

    const{user}=useContext(AuthContext)
    


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
    function searchTags(tagsArr){
        if(tagsArr.length){
            const newList = events.filter(ann => ann.tags.some(tag=>tagsArr.includes(tag)))
        setFilteredEvents(newList)}
        else {
            setFilteredEvents(events)
        }
    }



    return (

        <div>
            <div className="flex-center mt-2 mb-2">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        {isLoggedIn ?
        <Link exact="true" to="/main">
          Go back
        </Link>
        :
        <Link exact="true" to="/">
          Go back
        </Link>
        }
      </div>
            <h1>Check all the events</h1>
            <ScrollUpBtn />
            <Searchbar filter={search} searchTags={searchTags} />
            
            <div className="flex-column">
            

            
            
            

                {eventsFiltered.map((event)=>(
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
            <Link to='/events/create-event'><button className="btn btn-warning">Create Event</button></Link>
            {user === null ?(<p></p>):(<Navbar />)}
        </div>
    );
}

export default AllEvents;