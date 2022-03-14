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
  
  function check(j) {
    console.log("caca",form.tags.length)
    
      
  }

  function handleInputChange(event) {

    if(form.tags.length > 2){
      form.tags.pop()
    alert("Please select only 3")
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
    })
    
  }

  return (
    <div className="margin-top">
    <div className="flex-center">
      <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
      <Link exact= "true" to="/"> Go back</Link>
    </div>
      <h2>SIGN UP</h2>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="Choose your username"
          value={username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        <label htmlFor="input-tags">Select up to 5 tags that define you</label>
        <select  onChange={handleInputChange} name="tags" multiple id="userRequest_activity">
            {Options.map((e)=>(<option value={e} onClick={check}>{e}</option>))}
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
    </div>
  );
}

 
