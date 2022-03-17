import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/auth.context";

import { Options } from "../utils/tags";

function AnnouncementEditPage(props){
    const [announcement, setAnno] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const{
      title,
      description,
      image,
      announcementDate,
      expirationDate,
      location,
      tags,
    } = announcement

    const { user } = useContext(AuthContext);

    const [error, setError] = useState(null);

    useEffect(() => {
      
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}/edit`)
          .then((response) => setAnno(response.data))
          .catch((error) => console.log(error));
      }, [id]);

      function handleFormSubmission(e) {
        e.preventDefault();

        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}/edit`, announcement)
            .then()
            .catch(navigate(`/announcements/${id}`))
     }


     function handleImgUpload(e) {
    
        const uploadImgForm = new FormData();
    
        uploadImgForm.append("image", e.target.files[0]);
    
        axios
          .post(
            `${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}/img-upload`,
            uploadImgForm
          )
          .then((response) => {
            setAnno((oldEvent) => ({ ...oldEvent, image: response.data.fileUrl }));
          })
          .catch((err) => console.log("Error while uploading the file: ", err));
      }

     function handleInputChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setAnno((announcement) => ({ ...announcement, [name]: value }));
      }

      function deleteAnnouncement(){
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}/edit`)
        .then(navigate('/announcements'))
      }


      return (
        <div>
      <div className="flex-center">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact="true" to={`/announcements/${id}`}>
          Go back
        </Link>
      </div>
      <h2>EDIT ANNOUNCEMENT</h2>
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

        <label>Image:</label>
        {announcement.image ? (
          <img src={announcement.image} alt="eventpic" />
        ) : (
          <p>No image yet</p>
        )}
        <input type="file" name="image" onChange={handleImgUpload}></input>

        <label htmlFor="input-date">Date</label>

        <label htmlFor="input-announcementDate">Date</label>
        <input
          id="input-announcementDate"
          type="date"
          name="date"
          min={new Date().toISOString().slice(0,10)}
          value={announcement.announcementDate && announcement.announcementDate.slice(0,10)}
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
          min={new Date().toISOString().slice(0,10)}
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

        <button className="btn btn-warning mb-4 mt-2" type="submit">
          Submit
        </button>
      </form>


      <button className="btn btn-danger" onClick={deleteAnnouncement}>
          Delete this announcement
        </button>
      <Navbar />
    </div>
      );



}

export default AnnouncementEditPage;