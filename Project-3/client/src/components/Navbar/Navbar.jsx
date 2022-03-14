import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/auth.context";

function Navbar(props) {
  const { user, isLoggedIn } = useContext(AuthContext);

  const popBtn = document.getElementById("popUp");

  function popUp() {
    popBtn.classList.toggle("show");
  }

  return (
    <div className="navbar flex-row flex-center">
      <img
        src="../../../plus.png"
        alt="home"
        className="nav-icon"
        onClick={popUp}
      />

      <Link exact to="/main">
        <img src="../../../home-icon.png" alt="home" className="nav-icon" />{" "}
      </Link>
      <Link exact to="/profile">
          <img
            src={user.image}
            alt="profile"
            className="nav-icon"
            onClick={popUp}
          />
      </Link>
    </div>
  );
}

export default Navbar;
