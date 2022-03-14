import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { Options } from "../utils/tags";
import './EditProfilePage.css'


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


    if(user.videos){
      let start = ""
        for (let i = 0; i < user.videos.length; i++){
          
            if(user.videos[i] === "=") {
                start = i + 1
                break
            }
            
        }
        user.videos = user.videos.slice(start, start + 11)
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
          videos: []

        }));
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setUser((user) => ({ ...user, [key]: value }));
  }


function handleImgUpload(e){
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadImgForm = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadImgForm.append("image", e.target.files[0]);
 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}/img-upload`, uploadImgForm)
      .then(response => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setUser(oldUser=>({...oldUser, image: response.data.fileUrl }));
      })
      .catch(err => console.log("Error while uploading the file: ", err));

}


  return (
    <div>
      <form onSubmit={handleSubmit} className="auth__form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          ></input>
        </div>
        
        <div>
          <label>Image:</label>
          {user.image ? <img src={user.image} alt="EAHIVABVA" /> : <p>No image yet</p>}
          <input
            type="file"
            name="image"
            onChange={handleImgUpload}
          ></input>
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={user.description}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Tags:</label>
          <select name="tags" onChange={handleChange} multiple='multiple'>
            {Options.map((e)=>(<option key={e} value={e}>{e}</option>))}
          </select>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Videos:</label>
          <input
            type="text"
            name="videos"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Your Announcements:</label>
          {user.ownAnnouncements}
        </div>
        <div>
          <label>Announcements:</label>
          {user.announcements}
        </div>
        <div>
          <label>Events:</label>
          {user.events}
        </div>
        <button type="submit" className="button__submit">
          Submit
        </button>
      </form>
      <Navbar />
    </div>
  );
}

export default EditProfilePage;
