import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

function Navbar(props) {
  const [users, setUsers] = useState([]);
  const { user, image, userImg } = useContext(AuthContext);

useEffect(() => { 
  axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}`)
  .then((response) => {
    userImg(response.data.image)
    // setUsers(response.data.filter((user) => user._id === currentUser._id));
  })
  .catch((err) => console.log(err));
},[user._id, userImg, users] );





  let [navbar, setNavbar] = useState("")

  const popBtn = document.getElementById("popUp");



  function popUp() {
    popBtn.classList.toggle("show");
  }

    return (

        <div className='navbar flex-row flex-evenly '>

<div className="btn-group dropup">
  <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Dropup
  </button>
  <ul className="dropdown-menu">
    <p>PABLOOOOOO</p>
  </ul>
</div>
            
            <img src="../../../plus.png" alt="home" className='drop-btn nav-icon' onClick={popUp}/>    

            
            <Link exact= "true" to="/main"><img src="../../../home-icon.png" alt="home" className='nav-icon'/> </Link>


            <Link exact= "true" to="/profile"><img src={image} alt="profile" className='nav-icon'/></Link>

        </div>
    );
}

export default Navbar;