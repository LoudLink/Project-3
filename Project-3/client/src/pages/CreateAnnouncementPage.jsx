import {React, useState, useContext} from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CreateAnnouncementPage(props) {

    const [announcement, setAnnouncement] = useState({
        title: "",
        description: "",
        image: "",
        eventDate: "",
        expirationDate: "",
        active: false,
        participants: "",
        tags: ""
    });

    const { title, description, image, eventDate, expirationDate, participants, location, tags } = announcement;
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    function handleInputChange(e) {
        const { name, value } = e.target;
        return setAnnouncement({ ...announcement, [name]: value });
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        const eventDetails = {
            title, 
            description, 
            image, 
            eventDate, 
            expirationDate,
            participants, 
            location, 
            tags,
        }
        

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${user._id}`, eventDetails )
        .then((response) => {
            navigate("/announcements")
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

export default CreateAnnouncementPage;