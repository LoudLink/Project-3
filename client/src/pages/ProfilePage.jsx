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

  const [ownerEvent,setOwnerEvent]=useState('')
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
            console.log("AQUI ESTAMOS AHORA",res.data)
            setUser(res.data);
          })
          .catch((err) => console.log(err));
      });
  };

  

  useEffect(() => {
    getUser();
  }, []);

  function getOwner(id){

      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`)
      .then((res)=>{
        setOwnerEvent(res.data.username)
      })
    }
  


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

    removeToken();
    navigate("/#");
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
            console.log("VIDEO RESPONSE", response.data);
            setUser(response.data);
          });
      });
  }

  function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
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
          <p>{user.location}</p>
        <p className="lead">
          You have signed in with this address: {user.email}
        </p>
        <div className="card m-3 shadow-lg p-3 mb-5 bg-body rounded">
          <p className="display-6">How do you describe yourself?</p>
          <p className=" blockquote">{user.description}</p>
        </div>

        

        <h3 className="display-6">Your videos</h3>
        {user.videos.length === 0 ? (
          <p>
            There are no videos to display yet. <br></br> Edit your profile to
            add!
          </p>
        ) : (
          <div className="dividersMain flex-row">
            <div>
              <div>
                <div>
                  <p>
                    {user.videos.map((vid) => (
                      <div>
                        <YoutubeEmbed embedId={vid} />
                        <button
                          onClick={deleteVideo}
                          value={vid}
                          className="btn btn-danger mt-2 mb-4"
                        >
                          Delete this video
                        </button>
                      </div>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <hr></hr>

        <p className="lead">Other people can search you by this tags:</p>
        <div className="flex-row center gap">
          {user.tags.map((tag) => (
            <p key={tag} className="tags">
              &nbsp; #{tag} &nbsp;
            </p>
          ))}
        </div>

        <hr className="m-3 shadow-lg p-3 mb-5 bg-body rounded"></hr>

        <div>
          <p className="display-5">
            <b>Your LoudLink</b>
          </p>

          <div className="card m-3 shadow-lg p-3 mb-5 bg-body rounded">
          <div>
            <h3
              className="display-6 collapsed"
              data-bs-toggle="collapse"
              href="#collapseYourAnno"
              role="button"
              aria-expanded="false"
              aria-controls="collapseYourAnno"
            >
              Your announcements
            </h3>
            <img src="../../arrow-down.png" alt="arrow down" style={{width:10}}></img>
            </div>
            
            {user.ownAnnouncements.length !== 0 ? (
              user.ownAnnouncements.map((anno) => (
                <div
                  className="card ms-3 me-3 mb-1 text-center shadow"
                  id="collapseYourAnno"
                >
                  <p>{capitalize(anno.title)}</p>
                  <Link
                    exact="true"
                    to={`/announcements/${anno._id}`}
                    className="link-info"
                  >
                    See more
                  </Link>
                </div>
              ))
            ) : (
              <p>You didn't publish any announcements yet...</p>
            )}

            <hr></hr>

              <div>
            <h3
              className="display-6 collapsed"
              data-bs-toggle="collapse"
              href="#collapseYourEvents"
              role="button"
              aria-expanded="false"
              aria-controls="collapseYourEvents"
            >
              Your events
            </h3>
            <img src="../../arrow-down.png" alt="arrow down" style={{width:10}}></img>
            </div>

            {user.ownEvents.length !== 0 ? (
              user.ownEvents.map((e) => (
                <div
                  className="card ms-3 me-3 mb-1 text-center shadow"
                  id="collapseYourEvents"
                >
                  <p>{capitalize(e.title)}</p>
                  <p>
                    <b>Date: </b>
                    {new Date(e.date).toDateString()}
                  </p>
                  <Link
                    exact="true"
                    to={`/events/${e._id}`}
                    className="link-info"
                  >
                    See more
                  </Link>
                </div>
              ))
            ) : (
              <p>You didn't publish any events yet...</p>
            )}

            <hr></hr>


              <div>
            <h3
              className="display-6 collapsed"
              data-bs-toggle="collapse"
              href="#collapseAppliedAnno"
              role="button"
              aria-expanded="false"
              aria-controls="collapseAppliedAnno"
            >
              Applied announcements
            </h3>
            <img src="../../arrow-down.png" alt="arrow down" style={{width:10}}></img>

          

            </div>
            
            {user.announcements.length !== 0 ? (
              user.announcements.map((anno) => (
                <div
                  key={anno.id}
                  className="card ms-3 me-3 mb-1 text-center shadow"
                  id="collapseAppliedAnno"
                >
                  <p>{anno.title}</p>
                  <p>
                    <b>Created by: </b>
                    {getOwner(anno.owner)}{capitalize(ownerEvent)}
                  </p>

                  <Link exact={true} to={`/announcements/${anno._id}`} className="link-info">See more!</Link>
                </div>
              ))
            ) : (
              <div>
                <p>You haven't applied to any announcement yet!</p>
                <Link exact="true" to="/announcements" className="link-info">
                  Check other users' announcements here!
                </Link>
              </div>
            )}

            {user.acceptedAnnouncements.length !== 0 ? (
              <div>
              <h3
                className="display-6 collapsed"
                data-bs-toggle="collapse"
                href="#collapseAcceptedAnno"
                role="button"
                aria-expanded="false"
                aria-controls="collapseAcceptedAnno"
              >
                Accepted announcements
              </h3>
              <img src="../../arrow-down.png" alt="arrow down" style={{width:10}}></img>
              </div>
              
            ) : (
              <p></p>
            )}
            {user.acceptedAnnouncements.length !== 0 ? (
              user.acceptedAnnouncements.map((anno) => (
                <div
                  className="card ms-3 me-3 mb-1 text-center shadow"
                  id="collapseAcceptedAnno"
                >
                  <p>{anno.title}</p>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div>
          <div>
            <Link to={`/profile/${user._id}/edit`}>
              <button className="btn btn-warning mb-4">Edit profile</button>
            </Link>
          </div>
          <button onClick={handleLogout} className="btn btn-dark">
            Logout
          </button>
        </div>
        <hr></hr>
        <div className="card m-3 shadow-lg p-3 mb-5 bg-body rounded">
          <p className="lead">
            Here you can delete your account. Please be aware that once you
            click the button the data is enterily removed and can't be accessed
            again. <br></br> <b>This action is irreversible!</b>
          </p>
          <button onClick={deleteUser} className="btn btn-danger">
            Delete Account
          </button>
        </div>
        <br className="mb-5"></br>
        <Navbar />
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default ProfilePage;
