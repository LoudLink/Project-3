import axios from "axios";
import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";

import YoutubeEmbed from "../components/Youtube/youtube";

function ProfilePage(props) {
  const [video, setVideo] = useState({});

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
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`
          )
          .then((res) => {
            setUser(res.data);
          })

          .catch((error) => console.log(error));
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  function deleteUser() {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        axios
          .delete(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`
          )
          .then(() => navigate("/"));
      })
      .catch((error) => console.log("Error while deleting user: ", error));
  }

  return (
    <div>
      <div>
        <Link to={`/profile/${user._id}/edit`}>
          <button>Edit profile</button>
        </Link>
      </div>
      <div>
        <img width={50} src={user.image} alt="Your avatar goes here" />
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.description}</p>
        <p>{user.tags}</p>
        <p>{user.location}</p>
        <h3>Videos</h3>
        <p>
          {user.videos.length === 0 && <p>no videos to display</p>}
          {user.videos.length !== 0 && (
            <p>
              <YoutubeEmbed embedId={user.videos} />
            </p>
          )}
        </p>
        <h3>
          Announcements
          {user.announcements}
        </h3>
        <h4>Your announcements</h4>
        <h3>Events</h3>
        <button onClick={deleteUser}>Delete Account</button>
      </div>

      <Navbar />
    </div>
  );
}

export default ProfilePage;
