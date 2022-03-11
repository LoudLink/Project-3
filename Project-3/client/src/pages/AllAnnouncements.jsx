import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../components/Announcements/AnnouncementCard';
import Searchbar from '../components/Searchbar/Searchbar';

function AllAnnouncements(props) {
    const[announcements,setAnnouncements]=useState([])
    const[announcementsFiltered,setAnnouncementsfiltered]=useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/announcements`)
        .then((response)=>{
            setAnnouncements(response.data);
            setAnnouncementsfiltered(response.data);
        })
        .catch((err)=>console.log(err))
    })

    function search(str){
        const newList=announcements.filter((announcement)=>{
            return announcement.title.toLowerCase().includes(str.toLowerCase())
    })
    setAnnouncementsfiltered(newList)
    }

    return (
        <div>
            <h1>Check all the announcements</h1>
            <Searchbar filter={search} />
            <div>
                {announcementsFiltered.map((announcement)=>(
                    <AnnouncementCard key={announcement._id} announcement={announcement}/>
                ))}
            </div>
        </div>
    );
}

export default AllAnnouncements;