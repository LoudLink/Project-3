import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard  from './EventCard'

function Users(props) {
    const[events,setEvents]=useState([]);

    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/events`)
    .then((response)=>{
        setEvents(response.data)
    })
    .catch((err)=>console.log('CAGADAAAAAAAA',err))
},[])
    return (
        <div>
        {events.map((event)=>(
            <EventCard key={event._id} event={event}/>
        ))}
            
        </div>
    );
}

export default Users;