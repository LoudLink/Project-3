import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Navbar from "../components/Navbar/Navbar";
import IsPrivate from "../components/IsPrivate/IsPrivate";
function AnnouncementDetailPage(props){
    const { id } = useParams()
    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState({
        title: "",
        description: "",
        participants: [],
        accepted: [],
        owner:[],

    })
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}`)
          .then((response) => {
            setAnnouncement(response.data)
          })
          .catch(setAnnouncement(false));
      }, [id]);



      function apply(){
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${user._id}/apply/${id}`)
        .then((res) => setAnnouncement(res.data))
      }



      function acceptParticipant(participant){
        const artist = participant.target.value
        axios
          .put(
            `${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}/confirm/${artist}`
          ).then((response)=>{
            setAnnouncement(response.data)
          })
          .catch();
      }

    function removeArtist(remove){
      console.log("remove from this ID", id)
      const removedArt = remove.target.value
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/announcements/${id}/delete/${removedArt}`)
      .then((response)=>{
        setAnnouncement(response.data)
      })
    }

  
  function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
  }
  
  return (
    <div>
      {!announcement ? (
        <h1>THIS ANNOUNCEMENT DOES NOT EXISTS</h1>
      ) : (
        <div>
          <div className="flex-center mt-2 mb-2">
            <img
              src="../../ios-arrow-back-logo-icon-png-svg (1).png"
              alt="arrow back"
              className="goBackBtn"
            />
            {isLoggedIn ? (
              <Link exact="true" to="/main">
                Go back
              </Link>
            ) : (
              <Link exact="true" to="/">
                Go back
              </Link>
            )}
          </div>
          <div>
            <img
              src={announcement.image}
              alt={announcement.title}
              className="img-fluid img-detail"
            />
          </div>
          <div className="text-start ms-4 mt-4">
            <h2 className="display-5">{capitalize(announcement.title)}</h2>
            <p className="card-text lead">
              <b>About:</b> {announcement.description}
            </p>
            <p className="card-text lead">
              <b>Where:</b> {announcement.location}
            </p>

            <p className="card-text lead">
              <b>Posted on:</b>{" "}
              {new Date(announcement.announcementDate).toDateString()}
            </p>
            <p className="tags card-text">&nbsp;{announcement.tags}&nbsp;</p>
          </div>
          <hr className="dropdown-divider"></hr>
          <div>
            <p className="lead"><b>Do you have the requisites?</b>
            </p>
          </div>
          <p className="card-text lead">
            <b>Apply before:</b>{" "}
            {new Date(announcement.expirationDate).toDateString()}
          </p>
        <div>
        {announcement.participants.map((participant)=>(
          <div>
          <p className="display-6">Pending for approval</p>
          <p><Link exact="true" to={`/users/${participant._id}`} className="link-info">{capitalize(participant.username)}</Link>
          {user._id===announcement.owner[0] ? (<button onClick={acceptParticipant} value={participant._id}>Confirm</button>):(<p></p>)}
          </p>
          </div>
        ))}
        </div>
        {user._id === announcement.owner[0] ? (
              <p></p>
            ) : (
              <button onClick={apply} className="btn btn-warning" >APPLY</button>
            )}
          <hr></hr>
          <div>
            {announcement.participants.length === 0 ? (
              <p className="lead">Nobody has apply to this announcement yet</p>
            ) : (
              <div>
            <h3 className="lead">PENDING:</h3>
              <p className="lead">
              Already {announcement.participants.length} apply to this announcement.
              </p>
              </div>
            )}
            
          </div>

          <div className="card m-3 shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="display-6">Confirmed artists</h3>
            {announcement.accepted.length !== 0 ?
              (announcement.accepted.map((artist) => (
              <div>
              <Link exact={true} to={`/users/${artist._id}`}>
              <p className="lead">{artist.username}</p>
              </Link>
              <button onClick={removeArtist} value={artist._id}>Remove artits</button>
              </div>)))
              :
              (<p className="lead">No artists confirmed yet!</p>)
            }
          </div>
          <div>
            {user._id === announcement.owner[0] ? (
              <Link exact={true} to={`/announcements/${id}/edit`}>
                <button className="btn btn-warning">Edit announcement</button>
              </Link>
            ) : (
              <p></p>
            )}
          </div>
          <div>
          {user._id === announcement.owner[0] ? (
            <Link exact={true} to="/events/create-event" state ={announcement}>
              <button className="btn btn-success">MAKE AN EVENT OUT OF THIS ANNOUNCEMNT</button>
            </Link>
            ):(
              <p></p>
            )}
          </div>
        </div>
      )}
      <Navbar />
    </div>
  );
}
export default AnnouncementDetailPage;