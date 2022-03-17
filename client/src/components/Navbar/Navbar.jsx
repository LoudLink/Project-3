import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

function Navbar(props) {
  const [users, setUsers] = useState([]);
  const { user, image, userImg } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}`)
      .then((response) => {
        userImg(response.data.image);
      })
      .catch((err) => console.log("CAGADAAAAAAAA", err));
  }, [user._id, userImg, users]);

  let [navbar, setNavbar] = useState("");


  const popBtn = document.getElementById("popUp");

  function popUp() {
    popBtn.classList.toggle("show");
  }

  return (
    <nav className="navbarBar fixed-bottom navbar-light">
      <div className="btn-group dropup flex-evenly flex-row">
        <button
          type="button"
          className="navbtn"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          id="navBtn"
        >
          <img
            src="../../../plus.png"
            alt="home"
            className="drop-btn nav-icon"
          />
        </button>

        <ul className="dropdown-menu ms-0 mb-1 p-2 pe-5 dark">
          <li><Link exact="true" to="/announcements/create-announcement" className="lead text-light mb-2">Create an announcement</Link> </li>
          <li><Link exact="true" to="/events/create-event" className="lead text-light">Create an event</Link> </li>
        </ul>

        <Link exact="true" to="/main">
          <img src="../../../home-icon.png" alt="home" className="nav-icon" />{" "}
        </Link>

        <Link exact="true" to="/profile">
          <img src={image} alt="profile" className="nav-icon" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
