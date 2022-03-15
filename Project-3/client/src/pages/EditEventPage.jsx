import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/auth.context";

function EventEditPage(props) {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
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
  const { user } = useContext(AuthContext);

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  function handleFormSubmission(e) {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/events/${id}`, event)
      .then((response) => {
        setEvent((event) => ({
          ...event,
          image: "",
          title: "",
          description: "",
          date: "",
          schedule: "",
          location: "",
          price: "",
        }));
        navigate(`/events/${id}`);
      })
      .catch((error) => console.log(error));
  }

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setEvent((event) => ({ ...event, [name]: value }));
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
        console.log("response is: ", response);

        setEvent((oldEvent) => ({ ...oldEvent, image: response.data.fileUrl }));
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
        <Link exact="true" to={`/events/${id}`}>
          Go back
        </Link>
      </div>
      <h2>EDIT EVENT</h2>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-title">Title</label>
        <input
          id="input-title"
          type="text"
          name="title"
          value={event.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-description">Description</label>
        <input
          id="input-description"
          type="description"
          name="description"
          value={event.description}
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
          value={event.date}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-schedule">Schedule</label>
        <input
          id="input-schedule"
          type="time"
          name="schedule"
          value={event.schedule}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-price">Price</label>
        <input
          id="input-price"
          type="price"
          name="price"
          value={event.price}
          onChange={handleInputChange}
        />

        <label htmlFor="input-location">Location</label>
        <input
          id="input-location"
          type="location"
          name="location"
          value={event.location}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-tags">
          Select up to 5 tags to define what you're searching for
        </label>
        <select
          onChange={handleInputChange}
          value={event[tags]}
          name="tags"
          multiple
        >
          <option value="rock">Rock</option>
          <option value="classical">Classical</option>
          <option value="band">Band</option>
          <option value="sound-tech">Sound Tech</option>
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

export default EventEditPage;
