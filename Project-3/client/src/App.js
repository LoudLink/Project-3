import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./config/routes";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import CreateEventPage from "./pages/CreateEventPage";

import AnnouncementDetailPage from "./pages/AnnouncementDetailPage"

import EditEventPage from "./pages/EditEventPage";


import EventDetailPage from "./pages/EventDetailPage";


import EditProfilePage from './pages/EditProfilePage'

import CreateAnnouncementPage from "./pages/CreateAnnouncementPage";

import * as USER_HELPERS from "./utils/userToken";
import Banner from "./components/Banner/Banner";
import AllEvents from "./pages/AllEvents";
import AllAnnouncements from "./pages/AllAnnouncements";
import AllUsers from "./pages/AllUsers";
import ProfileDetailPage from "./pages/ProfileDetailPage";

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
        <Route exact= "true" path="/announcements/create-announcement" element={<CreateAnnouncementPage/>}/>
        <Route exact= "true" path="/events/:id/edit" element={<EditEventPage/>}/>
        <Route exact= "true" path="/events/:id" element={<EventDetailPage/>}/>
        <Route exact= "true" path="/events/create-event" element={<CreateEventPage/>}/>
        <Route exact= "true" path="/profile/:id/edit" element={<EditProfilePage/>}/>
        <Route exact= "true" path="/users/:id" element={<ProfileDetailPage/>}/>
        <Route exact= "true" path="/profile" element={<ProfilePage/>}/>
        <Route exact= "true" path="/signup" element={<Signup/>}/>
        <Route exact= "true" path="/login" element={<LogIn/>}/>
        <Route exact= "true" path="/main" element={<MainPage/>}/>
        <Route exact= "true" path="/events" element={<AllEvents/>}/>
        <Route exact= "true" path="/announcements" element={<AllAnnouncements/>}/>
        <Route exact= "true" path="/announcements/:id" element={<AnnouncementDetailPage/>}/>
        <Route exact= "true" path="/users" element={<AllUsers/>}/>
        <Route exact= "true" path="/" element={<HomePage/>}/>
    
      </Routes>
    </div>
  );
  

}
 