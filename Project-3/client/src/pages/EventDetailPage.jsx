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

      
      <div className="text-start m-3">
          <img src={event.image} alt={event.title} className="img-thumbnail"/>
          <h3 className="display-6"><b>{capitalize(event.title)}</b></h3>
            <p><b>Hosted by:</b> {event.owner[0].username}</p>
          <p className="lead">{capitalize(event.description)}</p>
          <p><b>When:</b> {new Date(event.date).toDateString()}</p>
          <p><b>Time:</b> {event.schedule}</p>
          <p><b>At:</b> {event.location}</p>
          <p><b>How much:</b> {event.price}€</p>
          <div className="text-center">
          {user?._id === event.owner[0]._id ? (<Link exact= "true" to={`/events/${id}/edit`}><button className="btn btn-warning">Edit this event</button></Link>):(<p></p>)}
        </div>
        <Mapbox />
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
