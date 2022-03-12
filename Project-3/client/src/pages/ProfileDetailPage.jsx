import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';


function ProfileDetailPage(props) {
    const {id}=useParams();
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
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`)
            .then((res)=>{
                console.log(res)
                setUser(res.data)        
            })
    }
    
    useEffect(() => {getUser()}, [])

    return (
        <div>
        
        <div>
           <img width={50} src={user.image} alt="Your avatar goes here" /> 
           <p>{user.username}</p>
           <p>{user.email}</p>
           <p>{user.description}</p>
           <p>{user.tags}</p>
           <p>{user.location}</p>
           <h3>Videos</h3>
           <p>user videos</p>
           <h3>Announcements</h3>
           <h4>Your announcements</h4>
           <h3>Events</h3>
        </div>
        
        <Navbar />
    </div>
    );
}

export default ProfileDetailPage;