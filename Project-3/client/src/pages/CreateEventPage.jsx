import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function CreateEventPage(props) {

    const [event, setEvent] = useState({
        title: "",
        description: "",
        image: undefined,
        date: undefined,
        schedule:undefined,
        artists: "",
        location: undefined,
        price:undefined,
        tags: ""
    });

    const { title, description, image, date, schedule, artists, location, price, tags } = event;
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    function handleInputChange(e) {
        const { name, value } = e.target;
        return setEvent({ ...event, [name]: value });
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        const eventDetails = {
            title, 
            description, 
            image, 
            date, 
            schedule, 
            artists, 
            location, 
            price, 
            tags,
        }

        

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/events/${user._id}`, eventDetails )
        .then((response) => {
            navigate("/events")
        })
    }

    return (
      <div>
        <div className="flex-center">
          <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
          <Link exact to="/main"> Go back</Link>
        </div>
        <h2>CREATE EVENT</h2>
        <form onSubmit={handleFormSubmission} className="auth__form">
          <label htmlFor="input-title">title</label>
          <input
            id="input-title"
            type="text"
            name="title"
            placeholder="Choose your title"
            value={title}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="input-description">description</label>
          <input
            id="input-description"
            type="description"
            name="description"
            placeholder="description"
            value={description}
            onChange={handleInputChange}
            required
            minLength="8"
          />

          

          {error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{error.message}</p>
            </div>
          )}

          <button className="button__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
}

export default CreateEventPage;