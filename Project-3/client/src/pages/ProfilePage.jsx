import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function ProfilePage(props) {

    const navigate = useNavigate();
    
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
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`)
            .then((res)=>{setUser(res.data)})
            .catch(error => console.log(error))
        })
    }
    
    useEffect(() => {getUser()}, [])

    function removeToken() {
        localStorage.removeItem("authToken")
    }

    function handleLogout() {
        const storedToken = localStorage.getItem("authToken");
        /*
        if (!storedToken) {
          setUser(null);
          return setIsLoading(false);
        }
        setIsLoading(true);
        logout(accessToken).then((res) => {
          if (!res.status) {
            // deal with error here
            console.error("Logout was unsuccessful: ", res);
          }
          USER_HELPERS.removeUserToken();
          setIsLoading(false);
          return setUser(null);
        });
        */
        removeToken()
        navigate("/")
        
        
      }

    function deleteUser() {
        const storedToken = localStorage.getItem("authToken");

        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`)
            .then(() => {
                removeToken();
                navigate("/")
            })
        })
        .catch(error => console.log("Error while deleting user: ",error))
    }

    return (
        <div>
            <div>
                <Link to={`/profile/${user._id}/edit`}><button>Edit profile</button></Link>
            </div>
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
               <button onClick={handleLogout}>Logout</button>
               <button onClick={deleteUser}>Delete Account</button>
            </div>
            
            <Navbar />
        </div>
    );
}

export default ProfilePage;