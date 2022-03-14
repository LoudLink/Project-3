import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { Options } from "../utils/tags";


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
          videos: ""

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

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth__form">
        
          <label htmlFor="input-username">Username:</label>
          <input
            id="input-username"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        
        
        
          <label>Image:</label>
          <input
            type="file"
            onChange={handleChange}
          ></input>
        
        
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={user.description}
            onChange={handleChange}
          ></input>
        
        
          <label>Tags:</label>
          <select name="tags" onChange={handleChange} multiple='multiple' size="8">
            {Options.map((e)=>(<option key={e} value={e}>{e}</option>))}
          </select>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleChange}
          ></input>
        
        
          <label>Videos:</label>
          <input
            type="text"
            name="videos"
            onChange={handleChange}
          ></input>
        
        <button type="submit" className="button__submit">
          Submit
        </button>
      </form>


     
      <Navbar />
    </div>
  );
}

export default EditProfilePage;
