import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import Searchbar from "../components/Searchbar/Searchbar";
import { Link } from "react-router-dom";
import ScrollUpBtn from "../components/ScrollUpBtn/ScrollUpBtn";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/auth.context";

function AllAnnouncements(props) {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsFiltered, setFilteredAnnouncements] = useState([]);
  const {isLoggedIn,user}=useContext(AuthContext)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/announcements`)
      .then((response) => {
        setAnnouncements(response.data);
        setFilteredAnnouncements(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function search(str) {
    const strLength = str.length;
    const newList = announcements.slice().filter((el) => {
      return (
        el.title.slice(0, strLength).toLowerCase() ===
        str.slice(0, strLength).toLowerCase()
      );
    });
    setFilteredAnnouncements(newList);
  }

  function searchTags(tagsArr) {
    if (tagsArr.length) {
      const newList = announcements.filter((ann) =>
        ann.tags.some((tag) => tagsArr.includes(tag))
      );

      setFilteredAnnouncements(newList);
    } else {
      setFilteredAnnouncements(announcements);
    }
  }

  return (
    <div>
      <div className="flex-center mt-2 mb-2">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact="true" to="/">
          Go back
        </Link>
      </div>

      <h1>Check all the announcements</h1>
      <ScrollUpBtn />
      <Searchbar filter={search} searchTags={searchTags} />
      
      <div className="flex-column">
        {announcementsFiltered.map((announcement) => (
          <AnnouncementCard
            key={announcement._id}
            announcement={announcement}
          />
        ))}
      </div>
      {user ? (
        <Link exact="true" to="/announcements/create-announcement">
        <button className="btn btn-warning">Create an announcement</button>
      </Link>
      ) : (
        <Link exact="true" to="/login">
        <button className="btn btn-warning">Create an announcement</button>
      </Link>
      )}
      {user  ? (<Navbar />) : (<p></p>)}
      
    </div>
  );
}

export default AllAnnouncements;
