
import axios from "axios";

class EventsService {
    constructor() {
      this.api = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
      });
    }

getAllEvents = () => {
    return this.api.get("/api/events").then(response=>response.data)
}

}

const eventsService = new EventsService();

export default eventsService;