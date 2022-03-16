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

  function handleInputChange(e) {
    const { name, value } = e.target;
    return setAnnouncement({ ...announcement, [name]: value });
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}`)
      .then((response) => {
        setAnnouncement((oldAnn) => ({
          ...oldAnn,
          image: response.data.image,
        }));
      })
      .catch((error) => console.log(error));
  }, [user._id]);

  function handleFormSubmission(e) {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/announcements/${user._id}`,
        announcement
      )
      .then((response) => {
        navigate("/announcements");
      });
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
      <h2 className="card-title">CREATE AN ANNOUNCEMENT</h2>

      <form onSubmit={handleFormSubmission} className="auth__form">

      <div class="form-floating">
      
        <input
          type="text"
          id="floatingInput"
          className="form-control"
          name="title"
          placeholder="Choose your title"
          value={title}
          onChange={handleInputChange}
          required
          minLength="8"
          maxLength="20"
        />
        <label for="floatingInput">Title</label>
        </div>


  <div class="form-floating mb-3">
        
        <input
          id="inputDescription"
          type="description"
          className="form-control"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleInputChange}
          required
          minLength="8"
        />
        <label for="inputDescription">Description</label>
        </div>

        <div class="form-floating mb-3">
        
        <input
          id="inputAnnouncementDate"
          type="date"
          className="form-control"
          name="announcementDate"
          value={announcementDate}
          onChange={handleInputChange}
          required
        />
        <label for="inputAnnouncementDate">Date</label>

        </div>

        <div class="form-floating mb-3">
        
        <input
          id="input-expirationDate"
          type="date"
          name="expirationDate"
          className="form-control"
          value={expirationDate}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-expirationDate">Expiration Date</label>
        </div>

        <div class="form-floating mb-3">

        
        <select id="input-tags" className="form-control" onChange={handleInputChange} name="tags" multiple>
          {Options.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        <label for="input-tags" className="text-end">Select up to 5 tags that define you</label>

        </div>

        <div class="form-floating mb-3">

        
        <input
          id="input-location"
          type="location"
          className="form-control"
          name="location"
          placeholder="Where?"
          value={location}
          onChange={handleInputChange}
          required
          minLength="4"
        />
        <label for="input-location">Location</label>
        </div>

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

export default CreateAnnouncementPage;
