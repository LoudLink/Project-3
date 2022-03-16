import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../App.css";

import YoutubeEmbed from "../components/Youtube/youtube";
import Spinner from "../components/Spinner/Spinner";

function ProfilePage(props) {
  const [video, setVideo] = useState({});
  let { isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    image: "",
    username: "",
    description: "",
    tags: [],
    location: "",
    videos: [],
    ownAnnouncements: [],
    announcements: [],
    acceptedAnnouncements: [],
    ownEvents: [],
  });

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`
          )
          .then((res) => {
            console.log("HERE IS THE PROBLEM" , res.data)
            setUser(res.data);
          })
          .catch((err) => console.log(err));
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  function removeToken() {
    localStorage.removeItem("authToken");
  }

  function handleLogout() {
    const storedToken = localStorage.getItem("authToken");
    /*
        if (!storedToken) {
          setUser(null);
          return setIsLoading(false);
        }
        setIsLoading(true);
        logout(accessToken).then((res) => {
          if (!res.status) {
            // deal with error here
            console.error("Logout was unsuccessful: ", res);
          }
          USER_HELPERS.removeUserToken();
          setIsLoading(false);
          return setUser(null);
        });
        */

      
        removeToken()
        navigate("/")
        
      }


  function deleteUser() {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //console.log("<<<<<<<<<<  GET RESP >>>>>>>>>")
        axios
          .delete(
            `${process.env.REACT_APP_SERVER_URL}/api/users/${response.data._id}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          )
          .then((deletedUser) => {
            //console.log("<<<<<<<<<<  DEL RESP >>>>>>>>>")
            //console.log("delted user front:", deletedUser)
            removeToken();
            navigate("/");
          });
      })
      .catch((error) => console.log("Error while deleting user: ", error));
  }



  function deleteVideo(vid) {

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
    const deletedvid = vid.target.value;
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}/deletevideo/${deletedvid}`
      )
      .then((response) => {
        console.log("VIDEO RESPONSE", response.data)
        setUser(response.data)
      })
     })
    }

  return user._id ? (
    <div>
      <div>
        <img
          className="profileImg m-3"
          src={user.image}
          alt="Your avatar goes here"
        />
        
        <p className="display-3">Welcome back {user.username}!</p>
        <p className="lead">You have signed in with this address: {user.email}</p>
        <div className="card m-3 shadow-lg p-3 mb-5 bg-body rounded">
        <p>{user.location}</p>
        <p className="display-6">How do you describe yourself?</p>
        <p className=" blockquote">{user.description}</p>
        </div>
        <p className="display-6">Other people can search you by this tags:</p>
        <div className="flex-row center gap">
          {user.tags.map((tag) => (
            <p key={tag} className="tags">
              &nbsp; #{tag} &nbsp;
            </p>
          ))}
        </div>
        <hr></hr>
        <h3 className="display-6">Your videos</h3>
        {user.videos.length === 0 ? (
          <p>There are no videos to display yet. <br></br> Edit your profile to add!</p>
        ) : (
          <p>
            {user.videos.map((vid) => (
              <div>
                <YoutubeEmbed embedId={vid} />
                <button onClick={deleteVideo} value={vid}>
                  Delete this video
                </button>
              </div>
            ))}
          </p>
        )}
        <hr></hr>
        <h3>Announcements</h3>
        {user.announcements.map((anno)=>
          <div className="anuncio">

          <Link exact={true} to={`/announcements/${anno._id}`}>
          <button>
              <p key={anno.id}>{anno.title}</p>
          </button>
          </Link>
            </div>
          )}
        
        <h3>Accepted announcements</h3>
        {user.announcements.length!==0 ? (user.acceptedAnnouncements.map((anno)=>
        <div>
          <p>{anno.title}</p>
        </div>
        )) : (<p></p>)}
        

        <h3>Your announcements</h3>
        <div className="anuncio-row">
        {user.ownAnnouncements.length!==0 ? (user.ownAnnouncements.map((anno) => (
            <div className="anuncio">
              <p>{anno.title}</p>
            </div>
          ))) : (<p>You didn't publish any announcements yet..</p>)}
          
          <h3>Events</h3>
          {user.ownEvents.map((e) => (
            <div>
              <p>{e.title}</p>
              <img src={e.image} alt="photo_event"></img>
            </div>
          ))}
          <div>
            <Link to={`/profile/${user._id}/edit`} className="editprof">
              <button>Edit profile</button>
            </Link>
          </div>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={deleteUser}>Delete Account</button>
        </div>
        <Navbar />
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default ProfilePage;
