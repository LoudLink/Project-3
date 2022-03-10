import React, { useState, useContext } from "react";
import { AuthContext } from "./../context/auth.context"
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Signup";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import axios from "axios";

export default function LogIn({ authenticate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/mainPage");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})
  };
  
  return (
    <div className="margin-top ">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit} className="auth__form">
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={handleUsername} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <button className="button__submit" type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}

