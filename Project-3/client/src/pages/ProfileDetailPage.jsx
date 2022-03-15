import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import YoutubeEmbed from "../components/Youtube/youtube";

function ProfileDetailPage(props) {
  const { id } = useParams();
  const [user, setUser] = useState({
    image: "",
    username: "",
    description: "",
    tags: [],
    location: "",
    videos: [],
    ownAnnouncments: "",
    announcements: "",
    ownEvents: "",
  });

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`)
      .then((res) => {
        console.log("DATA HERE", typeof res.data);
        setUser(res.data);
      })
      .catch(setUser(false));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {!user ? (
        <h1>THIS USER DOES NOT EXISTS</h1>
      ) : (
        <div>
          <div className="flex-center">
            <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
            <Link exact= "true" to="/main"> Go back</Link>
          </div>
          <img width={50} src={user.image} alt="Your avatar goes here" />
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.description}</p>
          <p>{user.tags}</p>
          <p>{user.location}</p>
          <h3>Videos</h3>
          <p>
            user videos
            {user.videos.length === 0 ? (
              <p>no videos to display</p>
            ) : (
              <p>
                {user.videos.map((vid) => (
                  <YoutubeEmbed embedId={vid} />
                ))}
              </p>
            )}
          </p>
          <h3>Announcements</h3>
          <h4>Your announcements</h4>
          <h3>Events</h3>
        </div>
      )}
      <Navbar />
      
    </div>
  );
}

export default ProfileDetailPage;
