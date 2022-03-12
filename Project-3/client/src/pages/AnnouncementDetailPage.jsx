import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
//import { populate } from "../../../server/models/Event.model";

function AnnouncementDetailPage(props){
    const { id } = useParams()

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
        <Link exact to="/main">
            APPLY!!!
        </Link>

      </div>
      )
}

export default AnnouncementDetailPage;