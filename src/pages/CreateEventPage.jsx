import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Options } from "../utils/tags";
import Navbar from "../components/Navbar/Navbar";

import { useLocation } from 'react-router-dom'

function CreateEventPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const anno = useLocation().state

  console.log("checking props",props.viaAnno)


const initialState = {
  original: false,
  title: anno?.title || "",
  description: anno?.description || "",
  image: anno?.image || "",
  date: anno?.announcementDate || null,
  schedule: null,
  artists: anno?.participants || [],
  location: anno?.location || "",
  price: null,
  tags: anno?.tags || [],
}

  const [event, setEvent] = useState(initialState);


  const {
    active,
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
      active,
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


    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${id}/img-upload`,
        uploadImgForm
      )
      .then((response) => {
        // console.log("response is: ", response);

        setEvent((oldUser) => ({ ...oldUser, image: response.data.fileUrl }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  }

  return (
    <div>
      <div className="flex-center mt-2 mb-2">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact="true" to="/main">
          Go back
        </Link>
      </div>
      <h2>CREATE AN EVENT</h2>

      <form onSubmit={handleFormSubmission} className="auth__form">

      <div className="form-floating">
      
        
        <input
          id="input-title"
          type="text"
          className="form-control"
          name="title"
          value={title}
          onChange={handleInputChange}
          required
          minLength="8"
          maxLength="20"
        />
        <label for="input-title">Title</label>
        </div>

        <div className="form-floating">

        <input
          id="input-description"
          type="description"
          name="description"
          className="form-control"
          placeholder="What's the event about"
          value={description}
          onChange={handleInputChange}
          required
          minLength="8"
        />
        <label for="input-description">Description</label>
        </div>

        <div className="form-floating">

        <input
          id="input-date"
          type="date"
          className="form-control"
          name="date"
          min={new Date().toISOString().slice(0,10)}
          onChange={handleInputChange}
          required
          minLength="8"
        />
        <label for="input-date">Date</label>
        </div>

        <div className="form-floating">

        <input
          id="input-schedule"
          type="time"
          className="form-control"
          name="schedule"
          onChange={handleInputChange}
          required
          minLength="8"
        />
        <label for="input-schedule">Schedule</label>
        </div>

        <div className="form-floating">

        <input
          id="input-price"
          type="price"
          name="price"
          className="form-control"
          placeholder="In €uros"
          onChange={handleInputChange}
        />
        <label for="input-price">Price</label>
        </div>

        <div className="form-floating">

        <input
          id="input-location"
          type="location"
          className="form-control"
          name="location"
          value={location}
          placeholder="Where's this happening"
          onChange={handleInputChange}
          minLength="4"
          required
        />
        <label for="input-location">Location</label>
        </div>

        <div className="form-floating">

        <select onChange={handleInputChange} name="tags" multiple size="5" className="form-control">
          {Options.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        <label for="input-tags">Select up to 5 tags that define you</label>
        </div>
        
        <label>Image:</label>
        <input id="input-date" type="file" name="image" onChange={handleImgUpload}></input>

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="btn btn-warning" type="submit">
          Submit
        </button>
      </form>
      <Navbar />
    </div>
  );
}

export default CreateEventPage;
