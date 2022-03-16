import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Spinner from "../components/Spinner/Spinner";
import Mapbox from "../components/Mapbox/Mapbox";


function EventDetailPage(props) {
  const { id } = useParams();
  const { isLoggedIn, isLoading,user } = useContext(AuthContext);

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
  }, [id, isLoading]);


  function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
  }


  return (

    event._id ?

    <div>
    {!event  ? <h1>THIS EVENT DOES NOT EXISTS</h1> :
    <div>
    
          <div className="flex-center mt-2 mb-2">
            <img
              src="../../ios-arrow-back-logo-icon-png-svg (1).png"
              alt="arrow back"
              className="goBackBtn"
            />
            {isLoggedIn ? (
              <Link exact="true" to="/main">
                Go back
              </Link>
            ) : (
              <Link exact="true" to="/">
                Go back
              </Link>
            )}
          </div>

      <img src={event.image} alt={event.title} className="img-fluid img-detail"/>
      <div className="text-start ms-4 mt-4">
      <h2  className="card-title">{capitalize(event.title)}</h2>
      <p><b>Hosted by:</b> {event.owner[0].username}</p>
      <p className="card-text">{event.description}</p>

      <p className="card-text"><b>When:</b> {new Date(event.date).toDateString()}</p>

      <p className="card-text"><b>Time:</b> {event.schedule}</p>
      <p className="card-text"><b>At:</b> {event.location}</p>
      <p className="card-text"><b>How much:</b> {event.price}€</p>
      <div>
        <div className="flex-center">
          <img
            src="../../ios-arrow-back-logo-icon-png-svg (1).png"
            alt="arrow back"
            className="goBackBtn"
          />
            {isLoggedIn ? <Link exact= "true" to="/main">Go back</Link> 
            : 
            <Link exact= "true" to="/">Go back</Link> }
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
          {user?._id === event.owner[0]._id ? (<Link exact= "true" to={`/events/${id}/edit`}>Edit this event</Link>):(<p></p>)}
        </div>
        <Mapbox/>
      </div>
      </div>
      {isLoggedIn && <Navbar />  }
      </div>
      }
    </div>
    :
    <Spinner />
  );
}

export default EventDetailPage;
