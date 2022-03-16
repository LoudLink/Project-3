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

    <div className="background">
      <ScrollUpBtn />
      
      <div className="mt-2">
        <div className="dividersMain flex-row">
          <Users />
        </div>
      </div>
      
      <hr className="mt-0"></hr>
    <div className="text-start ms-3"><h3 className="display-6">ANNOUNCEMENTS</h3></div>

      <div>
        <div className="dividersMain1 flex-row">
          <Announcements />
        </div>
      </div>
      <hr className="shadow p-3 mb-5 bg-body rounded"></hr>
      
    <div className="text-start ms-3 mt-3"><h3 className="display-6">EVENTS NEAR YOU</h3></div>
     
     <div>
      <div className="dividersMain flex-row">
        <Events />
      </div>
      </div>
      <Navbar />
    </div>
  );
}

export default MainPage;
