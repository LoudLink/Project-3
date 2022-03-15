import Announcements from "../components/Announcements/Announcements";
import Events from "../components/Events/Events";
import Users from "../components/Users/Users";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import ScrollUpBtn from "../components/ScrollUpBtn/ScrollUpBtn";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Spinner from "../components/Spinner/Spinner";

function MainPage(props) {

  

  return (

    <div className="flex-column background">
      <ScrollUpBtn />
      <Link to="/users" className="userrall">
        <button>All profiles</button>
      </Link>
      <div className="dividersMain flex-row">
        <Users />
      </div>

      <Link to="/announcements">
        <button>All adds</button>
      </Link>
      <div className="dividersMain flex-row">
        <Announcements />
      </div>
        
      <Link to="/events">
        <button>All events</button>
      </Link>
      <div className="dividersMain flex-row">
        <Events />
      </div>
      <Navbar />
    </div>
  );
}

export default MainPage;
