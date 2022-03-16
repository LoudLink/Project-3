import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Options } from "../utils/tags";
import Navbar from "../components/Navbar/Navbar";

function CreateEventPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();

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
    date,
    image,
    schedule,
    artists,
    location,
    price,
    tags,
  } = event;
  const [error, setError] = useState(null);
  
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

  function handleImgUpload(e) {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadImgForm = new FormData();

    uploadImgForm.append("image", e.target.files[0]);

    console.log("WHAT IS THIS ID IN THE EVENTS", id)

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${id}/img-upload`,
        uploadImgForm
      )
      .then((response) => {
        console.log("response is: ", response);

        setEvent((oldUser) => ({ ...oldUser, image: response.data.fileUrl }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  }

  return (
    <div>
      <div className="flex-center">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact= "true" to="/main">
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

        <label>Image:</label>
        {event.image ? (
          <img src={event.image} alt="eventpic" />
        ) : (
          <p>No image yet</p>
        )}
        <input type="file" name="image" onChange={handleImgUpload}></input>

        <label htmlFor="input-date">Date</label>
        <input
          id="input-date"
          type="date"
          name="date"
          min={new Date().toISOString().slice(0,10)}
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
      <Navbar />
    </div>
  );
}

export default CreateEventPage;
