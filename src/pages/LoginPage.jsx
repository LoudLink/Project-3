import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";


import "./SignupPage";

import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import axios from "axios";

export default function LogIn({ authenticate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { userImg } = useContext(AuthContext);

  const navigate = useNavigate();

  const { storeToken, authenticateUser, isLoggedIn } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, requestBody)

      .then((response) => {   
       console.log(response.data)     

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/main");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
        console.log(error.response.data.message)
      	setErrorMessage(errorDescription);
    	})
  };
  
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

      <h1>Login</h1>


      <form onSubmit={handleLoginSubmit} className="auth__form">

      <div className="form-floating">

        <input id="inputUsername" className="form-control" type="text" name="username" value={username} onChange={handleUsername} required/>
        <label for="inoutUsername">Username:</label>
        </div>

        <div className="form-floating">

        <input id="inputPassword" className="form-control" type="password" name="password" value={password} onChange={handlePassword} required/>
        <label for="inputPassword">Password:</label>
        </div>

        <button className="btn btn-warning" type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      
      <br></br>
      <br></br>
      <br></br>
      <p>Don't have an account yet?</p>

      <Link to={"/signup"}><button className="btn btn-info">Sign Up</button></Link>
    
    </div>

    
  )

}

