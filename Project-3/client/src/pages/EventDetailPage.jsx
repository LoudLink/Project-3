import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Spinner from "../components/Spinner/Spinner";


function EventDetailPage(props) {
  const { id } = useParams();
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    image: undefined,
  });

  

  useEffect(() => {
    if (isLoading) return <Spinner />;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch(setEvent(false));
  }, []);

  

  console.log(event);

  return (

    event._id ?

    <div>
    {!event  ? <h1>THIS EVENT DOES NOT EXISTS</h1> :
    <div>
    <div className="flex-center">
            <img
              src="../../ios-arrow-back-logo-icon-png-svg (1).png"
              alt="arrow back"
              className="goBackBtn"
            />
            {isLoggedIn ? <Link exact= "true" to="/main">
              Go back
            </Link> 
            : 
            <Link exact= "true" to="/">
              Go back
            </Link> }
            
          </div>

      <img src={event.image} alt={event.title} />
      <h3>{event.title}</h3>
      {/*<p>Hosted by: {event.owner[0]}</p>*/}
      <p>{event.description}</p>

      <p>When: {new Date(event.date).toDateString()}</p>

      <p>Time: {event.schedule}</p>
      <p>At: {event.location}</p>
      <p>How much: {event.price}€</p>
      <div>

          <Link exact= "true" to={`/events/${id}/edit`}>Edit this event</Link>

      </div>

    </div>
     }
    {isLoggedIn && <Navbar />  }
    </div>

    :

    <Spinner />
  );
}

export default EventDetailPage;
