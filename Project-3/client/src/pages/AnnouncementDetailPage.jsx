import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
//import { populate } from "../../../server/models/Event.model";
import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Navbar from "../components/Navbar/Navbar";

function AnnouncementDetailPage(props){
    const { id } = useParams()

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [announcement, setEvent] = useState({
        title: "",
        description: "",
        participants: [],
    })


    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}`)
          .then((response) => setEvent(response.data))
          .catch((error) => console.log(error));
      }, [id]);

      function apply(){        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${user._id}/apply/${id}`)
        .then(() => {
          navigate("/main")
        })
      }
      console.log(announcement)
      return(
        <div>
          <div className="flex-center">
            <img
              src="../../ios-arrow-back-logo-icon-png-svg (1).png"
              alt="arrow back"
              className="goBackBtn"
            />
            <Link exact to="/main">
              Go back
            </Link>
          </div>
        <h2>WISH TO APLLY TO THIS ANNOUNCEMENT</h2>
        <img src={announcement.image} alt={announcement.title} />
        <h3>{announcement.title}</h3>

        <p>About: {announcement.description}</p>
        <p>{announcement.tags}</p>
        <p>At: {announcement.location}</p>
        <p>Posted on: {new Date(announcement.announcementDate).toDateString()}</p>
        <p>Apply before: {new Date(announcement.expirationDate).toDateString()}</p>
        <p>PARTICIPANTS: { announcement.participants.length === 0 ? <p>Nobody has apply to this announcement yet</p> : <p>Already {announcement.participants.length} apply to this announcement </p>}</p>
          <button onClick={apply}>
            Apply to this announcement 
          </button>
          <Navbar />
      </div>
      )
}

export default AnnouncementDetailPage;