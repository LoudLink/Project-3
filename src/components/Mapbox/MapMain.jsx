import "./MapMain.css";
import axios from "axios";
import eventsService from "../../services/events";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_TOKEN;

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.17);
  const [lat, setLat] = useState(41.38);
  const [zoom, setZoom] = useState(12);
  const [events, setEvents] = useState([]);
  const elemRef = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    eventsService.getAllEvents().then((events) => {
      events.map((event) => {
        if (event.location !== null) {
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.location}.json?proximity=-74.70850,40.78375&access_token=${process.env.REACT_APP_MAP_API_TOKEN}`
            )
            .then((response2) => {
              const eventLat = response2.data.features[0].center[0];
              const eventLng = response2.data.features[0].center[1];

              const marker = new mapboxgl.Marker({
                element: elemRef.current,
              })
                .setLngLat({ lng: eventLat, lat: eventLng })
                .addTo(map.current);
            });
        }
      });
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
