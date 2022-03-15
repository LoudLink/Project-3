import "../App.css";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner"
import Searchbar from "../components/Searchbar/Searchbar"
import Users from "../components/Users/Users"
import Announcements from "../components/Announcements/Announcements"
import Events from "../components/Events/Events"
import ScrollUpBtn from "../components/ScrollUpBtn/ScrollUpBtn";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Spinner from "../components/Spinner/Spinner";

function HomePage() {

  const isLoading = useContext(AuthContext)

 
  
  

  return (
    <div className="App">

      <div className="homePageLanding">
          
          <div className="homePageLinks">
          <Link exact="true" to={"/signup"}>SIGNUP</Link>
          /
          <Link exact="true" to={"/login"}>LOGIN</Link>
          </div>
        
      </div>
      <div className="homePageBottom">
        <ScrollUpBtn />
        <div>
          <div className="red-bg"><h2>WHAT PEOPLE IS LOOKING FOR?</h2></div>
          <div className="dividersMain flex-row">
          <Announcements />
          </div>
        
          <div className="red-bg"><h2>EVENTS AROUND YOU</h2></div>
          <div className="dividersMain flex-row">
            <Events />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
