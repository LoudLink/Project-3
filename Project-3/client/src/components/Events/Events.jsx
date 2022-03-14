import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import "./Event.css";

function Users(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => console.log("CAGADAAAAAAAA", err));
  }, []);
  return (
    <div>
      {events.length ? (
        events.map((event) => (
          <div>
            <EventCard key={event._id} event={event} />
          </div>
        ))
      ) : (
        <div id="noMoreContent">
          <p>There are no events to show!</p>
          <Link exact to="/events/create-event">
            Create a new event
          </Link>
          {/* <img src="../../images/" alt="pic" width="400" height="240" /> */}
        </div>
      )}
    </div>
  );
}

export default Users;
