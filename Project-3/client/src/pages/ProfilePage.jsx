import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import YoutubeEmbed from "../components/Youtube/youtube";
import Spinner from "../components/Spinner/Spinner";

function ProfilePage(props) {

  const [video, setVideo] = useState({});
  const {isLoading} = useContext(AuthContext)
  const navigate = useNavigate();

  const [user, setUser] = useState({
    image: "",
    username: "",
    description: "",
    tags: [],
    location: "",
    videos: [],
    ownAnnouncements: [],
    announcements: [],
    ownEvents: [],
  });

  

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`
          )
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => console.log(err));
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) return <Spinner />;

  console.log(isLoading)

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
            console.log("<<<<<<<<<<  GET RESP >>>>>>>>>")
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`,  {headers: { Authorization: `Bearer ${storedToken}`}})
            .then((deletedUser) => {
                console.log("<<<<<<<<<<  DEL RESP >>>>>>>>>")
                console.log("delted user front:", deletedUser)
                removeToken();
                navigate("/")
            })
        })
        .catch(error => console.log("Error while deleting user: ",error))
    }

    function deleteVideo(vid){
        const deletedvid = vid.target.value
        axios
          .delete(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}/deletevideo/${deletedvid}`
          ).then((response)=>{
            setUser(response.data)
          })
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
               <div className="flex-row gap">
                {user.tags.map((tag) => 
                  (<p key={tag} className="tags">&nbsp; {tag} &nbsp;</p>)
                )}
               </div>
               <p>{user.location}</p>
               <h3>Videos</h3>
               {user.videos.length === 0 ? <p>no videos to display</p> : 
               <p>{user.videos.map((vid)=>(
                <div>
               <YoutubeEmbed embedId= {vid} />
               <button onClick={deleteVideo} value={vid}>Delete this video</button>
               </div>
               ))} 
               </p>}
               <h3>Announcements</h3>
               <h3>Your announcements</h3>
               {user.ownAnnouncements.map((anno)=>(
                 <div>
                    <p>{anno.title}</p>
                    <img src={anno.image} alt='photo_event'></img>
                 </div>
                 )
                 )}
               <h3>Events</h3>
               {user.ownEvents.map((e)=>(<p>{e.title}</p>))}
               <button onClick={handleLogout}>Logout</button>
               <button onClick={deleteUser}>Delete Account</button>
             
            </div>
            <Navbar />
        </div>

    );

}

export default ProfilePage;
