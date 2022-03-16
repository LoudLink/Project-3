import React, { useEffect, useState } from "react";
import axios from "axios";
import AnnouncementCard from "./AnnouncementCard";
import { Link } from 'react-router-dom';
import './Announcement.css'

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/announcements`)
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((err) => console.log("ERROR DE ANUNCIOS", err));
  }, []);

  return (
    <div className="height">
      {announcements.length ? (
        announcements.map((announcement,indx) => (
          indx<=4 ?
          (<div key={announcement._id}>
              <AnnouncementCard announcement={announcement} />
          </div>)
          : indx === announcements.length-1 ?
             (<div>
                <Link to='/announcements'><img src="../../../flecha-correcta.png" alt='flecha rota'></img></Link>
             </div>)
             :
             (<p></p>)
          
          
        ))
      ) : (
        <div id="noMoreContent">
          <p>There are no announcements to show!</p>
          <Link exact= "true" to="/announcements/create-announcement">Create a new announcement</Link>
          {/* <img src="../../images/" alt="pic" width="400" height="240" /> */}
        </div>
      )}
    </div>
  );
}

export default Announcements;
