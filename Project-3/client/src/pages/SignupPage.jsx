import React, { useState } from "react";
import { signup } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import axios from "axios";

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    tags: ""
  });
  const { username, password, email, tags } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
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
      <Link exact to="/"> Go back</Link>
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

        <label htmlFor="input-tags">Select 5 tags that define you</label>
        <select onChange={handleInputChange} value={[tags]} name="tags" multiple>
          <option value="rock">Rock</option>
          <option value="classical">Classical</option>
          <option value="band">Band</option>
          <option value="sound-tech">Sound Tech</option>
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
