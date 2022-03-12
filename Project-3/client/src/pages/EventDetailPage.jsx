import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function EventDetailPage(props) {
  const { id } = useParams();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    image: undefined,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(event)

  return (
    <div>
      <div className="flex-center">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact to="/main">
          Go back
        </Link>
      </div>
      <img src={event.image} alt={event.title} />
      <h3>{event.title}</h3>
      {/*<p>Hosted by: {event.owner[0]}</p>*/}
      <p>{event.description}</p>
      <p>When: {new Date(event.date).toDateString()}</p>
      <p>Time: {event.schedule}</p>
      <p>At: {event.location}</p>
      <p>How much: {event.price}</p>
      <div>
          <Link exact to={`/events/${id}/edit`}>Edit this event</Link>
      </div>
      <Navbar />
    </div>
  );
}

export default EventDetailPage;
