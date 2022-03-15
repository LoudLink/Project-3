import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";
import { Options } from "../utils/tags";
import "./EditProfilePage.css";

function EditProfilePage(props) {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();

    if (user.videos) {
      let start = "";
      for (let i = 0; i < user.videos.length; i++) {
        if (user.videos[i] === "=") {
          start = i + 1;
          break;
        }
      }
      user.videos = user.videos.slice(start, start + 11);
    }

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, user)
      .then((response) => {

        setUser((user) => ({
          ...user,
          username: "",
          email: "",
          description: "",
          tags: "",
          videos: [],
        }));
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (event.target.name === "tags") {
      const selected = [...event.target.options]
        .filter((option) => option.selected)
        .map((option) => option.value);

      return setUser({ ...user, [name]: selected });
    }
    return setUser({ ...user, [name]: value });
  }

  function handleImgUpload(e) {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadImgForm = new FormData();

    uploadImgForm.append("image", e.target.files[0]);

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/${id}/img-upload`,
        uploadImgForm
      )
      .then((response) => {
        console.log("response is: ", response);

        setUser((oldUser) => ({ ...oldUser, image: response.data.fileUrl }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  }

  return (
    <div>
      <div className="flex-center">
        <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
        <Link exact= "true" to="/main"> Go back</Link>
      </div>
      <form onSubmit={handleSubmit} className="auth__form">
        <label htmlFor="input-username">Username:</label>
        <input
          id="input-username"
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />

        <label>Image:</label>
        {user.image ? (
          <img src={user.image} alt="userpic" />
        ) : (
          <p>No image yet</p>
        )}
        <input type="file" name="image" onChange={handleImgUpload}></input>

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={user.description}
          onChange={handleInputChange}
        ></input>

        <label htmlFor="input-tags">Select up to 5 tags that define you</label>
        <select
          onChange={handleInputChange}
          name="tags"
          multiple
          id="userRequest_activity"
        >
          {Options.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={user.location}
          onChange={handleInputChange}
        ></input>

        <label>Videos:</label>
        <input type="text" name="videos" onChange={handleInputChange}></input>

        <button type="submit" className="button__submit">
          Submit
        </button>
      </form>

      <Navbar />
    </div>
  );
}

export default EditProfilePage;
