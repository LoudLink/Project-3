import React, { useState } from "react";
import { signup } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import axios from "axios";
import { Options } from "../utils/tags";


export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    tags: []
  });
  const { username, password, email, tags } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  function check(j) {
    console.log("caca",form.tags.length)
  }

  function handleInputChange(event) {

    if(form.tags.length > 5){
      form.tags.pop()
    alert("Please select only 5")
  }

    const { name, value } = event.target;
    if(event.target.name === "tags") {
      
    const selected = [...event.target.options]
    .filter(option => option.selected)
      .map(option => option.value);
      
      
      
      return setForm({...form, [name]: selected})   }
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
      email,
      tags
    };

    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, credentials)
    .then((response) => {
      navigate("/login")
      console.log("ERRRRRRRORRRRRR", response.data.error)
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      console.log("ERRRRRRRORRRRRR",error.response.data.message)
      setErrorMessage(errorDescription);
    })
    
  }

  return (
    
    <div>
      <div className="flex-center mt-2 mb-2">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact="true" to="/">
          Go back
        </Link>
      </div>

      <h2 className="card-title">SIGN UP</h2>

      <form onSubmit={handleFormSubmission} className="auth__form">

      <div className="form-floating">

        <input
          id="input-username"
          type="text"
          name="username"
          className="form-control"
          placeholder="Choose your username"
          value={username}
          onChange={handleInputChange}
          required
        />
        <label for="input-username">Username</label>
        </div>

        <div className="form-floating">

        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={handleInputChange}
          required
          minLength="6"
        />
        <label for="input-password">Password</label>
        </div>

        <div className="form-floating">

        <input
          id="input-email"
          type="email"
          name="email"
          placeholder="email"
          className="form-control"
          value={email}
          onChange={handleInputChange}
          required
          minLength="8"
        />
        <label for="input-email">Email</label>
        </div>

        <div className="form-floating">

        <select className="form-control" size="6" onChange={handleInputChange} name="tags" required multiple min="5" id="userRequest_activity">
            {Options.map((e)=>(<option value={e} onClick={check}>{e}</option>))}
        </select>
        <label for="input-tags">Select up to 5 tags that define you</label>
        </div>

        {errorMessage && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{errorMessage}</p>
          </div>
        )}

        <button className="btn btn-warning mt-5" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

 
