import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../components/Announcements/AnnouncementCard';
import Searchbar from '../components/Searchbar/Searchbar';
import { Link } from 'react-router-dom';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';
import Navbar from '../components/Navbar/Navbar';
import Announcements from '../components/Announcements/Announcements';

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