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
        events.map((event,indx) => (
          indx<=4 ?
          (<div key={event._id}>
              <EventCard event={event} />
          </div>)
          : indx === events.length-1 ?
             (<div>
                <Link to='/events'><img src="../../../flecha-correcta.png" alt='flecha rota' style={{width: 100}}></img></Link>
             </div>)
             :
             (<p></p>)
        ))
      ) : (
        <div id="noMoreContent">
          <p>There are no events to show!</p>
          <Link exact= "true" to="/events/create-event">
            Create a new event
          </Link>
          {/* <img src="../../images/" alt="pic" width="400" height="240" /> */}
        </div>
      )}
    </div>
  );
}

export default Users;
