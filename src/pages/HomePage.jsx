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

      <div className="homePageLanding carousel slide" id="carouselExampleSlidesOnly" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="../../front-page.png" className="d-block w-100" alt="slide-1"  style={{height:250}}/>
          </div>
          <div className="carousel-item">
            <img src="../../slide-2.jpg" className="d-block w-100" alt="..." style={{height:250}} />
          </div>
          <div className="carousel-item">
            <img src="../../slide-3.jpg" className="d-block w-100" alt="..." style={{height:250}} />
          </div>
          <div className="homePageLinks display-6 text-center text-white">
          <Link exact="true" to={"/signup"} className=" display-6 text-center text-white  btn btn-dark">SIGNUP</Link>
          
          <Link exact="true" to={"/login"} className=" display-6 text-center text-white  btn btn-dark">LOGIN</Link>
          </div>
          
        
      </div>
      </div>

      



      <div className="homePageBottom">
        <ScrollUpBtn />
        <div className="m-3 card shadow p-3 mb-5 bg-body rounded">
        <div className="m-2">
        <h1 className="display-3 text-danger">WELCOME TO</h1>
        <h1 className="display-1 text-danger"> LOUDLINK</h1>
        <h4 className="text-muted">The app that connects artists</h4>
        <hr></hr>
        <br></br>
        <p className="lead text-justify">
          Are you ready to exhibit your paintings but you are missing a photographer that immortalizes it for your social networks?
          <br></br>
          Are you looking for an opening show that heats the ambient before your gig?
          <br></br>
          <br></br>
          Don't worry! LoudLink will connect you with other artists and people you need.
          <br></br>
          <br></br>
        </p>
          <p>CREATE YOUR ART RELATION.</p>
          <p className="display-5">CREATE LOUDLINK</p>
          <Link exact="true" to={"/signup"} className="lead text-center text-primary">Create an account</Link>
          </div>
          
        </div>

        <div>
        <hr></hr>
          <div><h2 className="display-6 text-start ms-3">WHAT PEOPLE IS LOOKING FOR?</h2></div>
          <div className="dividersMain flex-row">
          <Announcements />
          </div>
        
        <hr></hr>
          <div><h2 className="display-6 text-start ms-3">EVENTS AROUND YOU</h2></div>
          <div className="dividersMain flex-row">
            <Events />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
