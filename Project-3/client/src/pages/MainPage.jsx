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

  const { isLoading } = useContext(AuthContext);
  if (isLoading) return <Spinner />;

  return (
    <div className="mainPage flex-column margin-top">
      <ScrollUpBtn />
      <Link to="/users">
        <button>all profiles</button>
      </Link>
      <div className="dividersMain flex-row">
        <Users />
      </div>
      <Link to="/announcements">
        <button>all adds</button>
      </Link>
      
      <div className="dividersMain flex-row">
        <Announcements />
      </div>
      
        
      <Link to="/events">
        <button>all events</button>
      </Link>
      <div className="dividersMain flex-row">
        <Events />
      </div>
      <Navbar />
    </div>
  );
}

export default MainPage;
