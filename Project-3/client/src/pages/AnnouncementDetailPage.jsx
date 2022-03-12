import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
//import { populate } from "../../../server/models/Event.model";
import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function AnnouncementDetailPage(props){
    const { id } = useParams()

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        title: "",
        description: ""
    })


    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}`)
          .then((response) => setEvent(response.data))
          .catch((error) => console.log(error));
      }, []);

      function apply(){        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${user._id}/apply/${id}`)
        .then(() => {
          navigate("/main")
        })
      }

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

        <h3>{event.title}</h3>
        <h4>{event.description}</h4>

        

          <button onClick={apply}>
            APPLY FUCKER!!
          </button>


      </div>
      )
}

export default AnnouncementDetailPage;