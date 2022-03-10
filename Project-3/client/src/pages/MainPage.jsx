import Announcements from "../components/Announcements/Announcements";
import Events from "../components/Events/Events";
import Users from "../components/Users/Users";
import Navbar from "../components/Navbar/Navbar";



function MainPage(props) {

    

    

    return (
        <div className="mainPage flex-column margin-top">
          <div className="dividersMain flex-row">
              <Users />
          </div>
          <div className="dividersMain flex-row">
              <Announcements />
          </div>
          <div className="dividersMain flex-row">
              <Events />
          </div>
          <Navbar />
        </div>
    );
}

export default MainPage;