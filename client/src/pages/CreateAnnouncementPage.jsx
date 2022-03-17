import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Options } from "../utils/tags";
import Navbar from "../components/Navbar/Navbar";

function CreateAnnouncementPage(props) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { id } = useParams();

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

  function handleImgUpload(e) {

    const uploadImgForm = new FormData();

    uploadImgForm.append("image", e.target.files[0]);


    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}/img-upload`,
        uploadImgForm
      )
      .then((response) => {

        setAnnouncement((oldUser) => ({ ...oldUser, image: response.data.fileUrl }));
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
      <h2 className="card-title">CREATE AN ANNOUNCEMENT</h2>

      <form onSubmit={handleFormSubmission} className="auth__form">

      <div className="form-floating">
      
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


  <div className="form-floating mb-3">
        
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

          <div className="form-floating mb-3">
        
        {announcement.image ? (
          <img src={announcement.image} alt="eventpic" className="img-thumbnail"/>
        ) : (
          <p>No image yet</p>
        )}
          
        <input type="file" name="image" onChange={handleImgUpload} className="form-control-sm form-control"></input>
        </div>

          <div className="form-floating mb-3">
        
        <input
          id="inputAnnouncementDate"
          type="date"
          className="form-control"
          name="announcementDate"
          value={announcementDate}
          min={new Date().toISOString().slice(0,10)}
          onChange={handleInputChange}
          required
        />
        <label for="inputAnnouncementDate">Date</label>

        </div>

        <div className="form-floating mb-3">
        
        <input
          id="input-expirationDate"
          type="date"
          name="expirationDate"
          className="form-control"
          value={expirationDate}
          min={new Date().toISOString().slice(0,10)}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-expirationDate">Expiration Date</label>
        </div>

        

        
        <select id="input-tags" size="5" className="form-control" onChange={handleInputChange} name="tags" multiple>
          {Options.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        

        

        <div className="form-floating mb-3">

        
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
