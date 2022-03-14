import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Options } from "../utils/tags";
import Navbar from "../components/Navbar/Navbar";

function CreateAnnouncementPage(props) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    image: "",
    announcementDate: "",
    expirationDate: "",
    active: false,
    tags: [],
  });

  const {
    title,
    description,
    image,
    announcementDate,
    expirationDate,
    location,
    tags,
  } = announcement;

  

  // console.log(user);

  function handleInputChange(e) {
    const { name, value } = e.target;
    return setAnnouncement({ ...announcement, [name]: value}, );
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}`)
      .then((response) => {
        setImageUrl(response.data.image);
        // console.log(`
        //   "response.data.image", ${response.data.image}
        //   "imageURL",  ${imageUrl}`)
      })
      .catch((error) => console.log(error))
    }, [user._id, imageUrl]);

    console.log(`
    "imageURL",  ${imageUrl}`)

  function handleFormSubmission(e) {
    e.preventDefault();

    const announcementDetails = {
      title,
      description,
      image: imageUrl ,
      announcementDate,
      expirationDate,
      location,
      tags,
    };


     console.log("EVENTS DETAILs", typeof(announcementDetails.image) )

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/announcements/${user._id}`,
        announcementDetails
      )
      .then((response) => {
        console.log("RESPONSEresponse", response);

        navigate("/announcements");
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
        <Link exact= "true" to="/main">
          Go back
        </Link>
      </div>
      <h2>CREATE ANNOUNCEMENT</h2>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-title">Title</label>
        <input
          id="input-title"
          type="text"
          name="title"
          placeholder="Choose your title"
          value={title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-description">Description</label>
        <input
          id="input-description"
          type="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-announcementDate">Date</label>
        <input
          id="input-announcementDate"
          type="date"
          name="announcementDate"
          value={announcementDate}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-expirationDate">Expiration Date</label>
        <input
          id="input-expirationDate"
          type="date"
          name="expirationDate"
          value={expirationDate}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-tags">Select up to 5 tags that define you</label>
        <select onChange={handleInputChange} name="tags" multiple>
          {Options.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>

        <label htmlFor="input-location">Location</label>
        <input
          id="input-location"
          type="location"
          name="location"
          placeholder="Where?"
          value={location}
          onChange={handleInputChange}
          required
          minLength="4"
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
      <Navbar />
    </div>
  );
}

export default CreateAnnouncementPage;
