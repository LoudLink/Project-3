
import axios from "axios";

class EventsService {
    constructor() {
      this.api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
    }

getAllEvents = () => {
    return this.api.get("/events").then(response=>response.data)
}

}

const eventsService = new EventsService();

export default eventsService;