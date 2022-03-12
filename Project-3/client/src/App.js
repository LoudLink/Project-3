import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./config/routes";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateAnnouncementPage from "./pages/CreateAnnouncementPage";
import * as USER_HELPERS from "./utils/userToken";
import Banner from "./components/Banner/Banner";
import AllEvents from "./pages/AllEvents";
import AllAnnouncements from "./pages/AllAnnouncements";
import AllUsers from "./pages/AllUsers";

export default function App() {
/*
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
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
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;

  }*/
  return (
    <div className="App">
    <Banner />
      
      <Routes>
        <Route exact path="/announcements/create-announcement" element={<CreateAnnouncementPage/>}/>
        <Route exact path="/events/:id" element={<EventDetailPage/>}/>
        <Route exact path="/events/create-event" element={<CreateEventPage/>}/>
        <Route exact path="/profile" element={<ProfilePage/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/login" element={<LogIn/>}/>
        <Route exact path="/main" element={<MainPage/>}/>
        <Route exact path="/events" element={<AllEvents/>}/>
        <Route exact path="/announcements" element={<AllAnnouncements/>}/>
        <Route exact path="/users" element={<AllUsers/>}/>
        <Route exact path="/" element={<HomePage/>}/>
    
      </Routes>
    </div>
  );
  

}
 