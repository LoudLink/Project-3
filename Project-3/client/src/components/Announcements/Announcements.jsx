import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnnouncementCard from '../AnnouncementCard.jsx/AnnouncementCard';

function Announcements() {
    const[announcements,setAnnouncements]=useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/announcements`)
        .then((response)=>{
            setAnnouncements(response.data)
        })
        .catch((err)=>console.log('ERROR DE ANUNCIOS',err))
    },[])

    return (
        <div>
            {announcements.map((announcement)=>(
                <AnnouncementCard key={announcement._id} announcement={announcement}/>
            ))}        
        </div>
    );
}

export default Announcements;