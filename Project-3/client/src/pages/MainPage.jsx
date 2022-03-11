import Announcements from "../components/Announcements/Announcements";
import Events from "../components/Events/Events";
import Users from "../components/Users/Users";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";



function MainPage(props) {

    

    

    return (
        <div className="mainPage flex-column margin-top">
          <Link to='/allProfiles'><button>all profiles</button></Link>
          <div className="dividersMain flex-row">
              <Users />
          </div>
          <Link to='/allAnnouncements'><button>all adds</button></Link>
          <div className="dividersMain flex-row">
              <Announcements />
          </div>
          <Link to='/allEvents'><button>all events</button></Link>
          <div className="dividersMain flex-row">
              <Events />
          </div>
          <Navbar />
        </div>
    );
}

export default MainPage;