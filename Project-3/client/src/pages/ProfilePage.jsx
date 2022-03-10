import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { setUserToken } from '../utils/userToken';

function ProfilePage(props) {

    
    const [user, setUser] = useState({
        image: "",
        username: "",
        description: "",
        tags: [],
        location: "",
        videos: "",
        ownAnnouncments: "",
        announcements: "",
        ownEvents: ""
    });
    
    const getUser = () => {
        const storedToken = localStorage.getItem("authToken");
        
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            setUser(response.data)
        })
    }
    
    useEffect(() => {getUser()}, [])

    return (
        <div className='margin-top'>
            <div>
               <img src={user.image} alt="cargol" /> 
               <p>{user.username}</p>
               <p>{user.email}</p>
               <p>{user.description}</p>
               <p>{user.tags}</p>
               <p>{user.location}</p>
               <h3>Videos</h3>
               <p>user videos</p>
               <h3>Announcements</h3>
               <h4>Your announcements</h4>
               <h4>Announcements you've applied to</h4>
               <h3>Events</h3>
            </div>
            <Navbar />
        </div>
    );
}

export default ProfilePage;