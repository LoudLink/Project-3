import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";
import YoutubeEmbed from "../components/Youtube/youtube";

function ProfileDetailPage(props) {
  const { id } = useParams();
  const [user, setUser] = useState({
    image: "",
    username: "",
    description: "",
    tags: [],
    location: "",
    videos: [],
    ownAnnouncments: "",
    announcements: "",
    ownEvents: "",
  });

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(setUser(false));
  };

  useEffect(() => {
    getUser();
  }, []);

  function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
  }

  return user._id ? (
    <div>
      {!user ? (
        <h1>THIS USER DOES NOT EXISTS</h1>
      ) : (
        <div>
        <div className="flex-center mt-2 mb-2">
        <img
          src="../../ios-arrow-back-logo-icon-png-svg (1).png"
          alt="arrow back"
          className="goBackBtn"
        />
        <Link exact="true" to="/main">
          Go back
        </Link>
      </div>
          <img
            className="profileImg m-3"
            src={user.image}
            alt="Your avatar goes here"
          />
          <p className="display-3">{capitalize(user.username)}</p>
          <p>{user.location}</p>
          <div className="card m-3 shadow-lg p-3 mb-5 bg-body rounded">
            <p className=" blockquote">{user.description}</p>
          </div>
          <h3>Videos</h3>
          <p>
            {user.videos.length === 0 ? (
              <p>{capitalize(user.username)} has no videos to display</p>
            ) : (
              <div className="dividersMain flex-row">
                <div>
                  <div>
                    <div>
                      <p>
                        {user.videos.map((vid) => (
                          <div>
                            <YoutubeEmbed embedId={vid} />
                          </div>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </p>

          <hr></hr>

          <div className="flex-row center gap">
            {user.tags.map((tag) => (
              <p key={tag} className="tags">
                &nbsp; #{tag} &nbsp;
              </p>
            ))}
          </div>

          <div>
            <p className="display-5">
              <b>{capitalize(user.username)} LoudLink</b>
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
                  {capitalize(user.username)} announcements
                </h3>
                <img
                  src="../../arrow-down.png"
                  alt="arrow down"
                  style={{ width: 10 }}
                ></img>
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
                <p>{capitalize(user.username)} has no announcements yet...</p>
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
                  {capitalize(user.username)} events
                </h3>
                <img
                  src="../../arrow-down.png"
                  alt="arrow down"
                  style={{ width: 10 }}
                ></img>
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
                <p>
                  {capitalize(user.username)} didn't publish any events yet...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <Navbar />
    </div>
  ) : (
    <Spinner />
  );
}

export default ProfileDetailPage;
