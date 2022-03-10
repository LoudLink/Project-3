import "../App.css";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner"
import Searchbar from "../components/Searchbar/Searchbar"
import Users from "../components/Users/Users"
import Announcements from "../components/Announcements/Announcements"
import Events from "../components/Events/Events"


function HomePage() {
  return (
    <div className="App">

      <div>
      </div>

      <div className="homePageLanding">
        
          <Banner />
          <div className="homePageLinks">
          <Link exact to={"/signup"}>SIGNUP</Link>
          /
          <Link exact to={"/login"}>LOGIN</Link>
          </div>
        
      </div>
      <div className="homePageBottom">
        <Searchbar />
        <Users />
        <Announcements />
        <Events />
      </div>

    </div>
  );
}

export default HomePage;
