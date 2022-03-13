import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Options } from "../utils/tags";

function CreateEventPage(props) {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    image: undefined,
    date: undefined,
    schedule: undefined,
    artists: "",
    location: undefined,
    price: undefined,
    tags: "",
  });

  const {
    title,
    description,
    image,
    date,
    schedule,
    artists,
    location,
    price,
    tags,
  } = event;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
    };

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${user._id}`,
        eventDetails
      )
      .then((response) => {
        navigate("/events");
      });
  }

  return (
    <div>
      <div className="flex-center">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact to="/main">
          {" "}
          Go back
        </Link>
      </div>
      <h2>CREATE EVENT</h2>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-title">Title</label>
        <input
          id="input-title"
          type="text"
          name="title"
          placeholder="Choose your title"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-description">Description</label>
        <input
          id="input-description"
          type="description"
          name="description"
          placeholder="What's the event about"
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-date">Date</label>
        <input
          id="input-date"
          type="date"
          name="date"
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-schedule">Schedule</label>
        <input
          id="input-schedule"
          type="time"
          name="schedule"
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-price">Price</label>
        <input
          id="input-price"
          type="price"
          name="price"
          placeholder="In €uros"
          onChange={handleInputChange}
        />

        <label htmlFor="input-location">Location</label>
        <input
          id="input-location"
          type="location"
          name="location"
          placeholder="Where's this happening"
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-tags">Select up to 5 tags that define you</label>
        <select onChange={handleInputChange} name="tags" multiple max="5">
          {Options.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>

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
