import "./Mapbox.css";
import axios from "axios"
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_TOKEN;

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const elemRef = useRef(null);
  const [lng, setLng] = useState(2.1686);
  const [lat, setLat] = useState(41.3874);
  const [zoom, setZoom] = useState(14);


  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });

    axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.eventLocation}.json?proximity=-74.70850,40.78375&access_token=${process.env.REACT_APP_MAP_API_TOKEN}`
          )
          .then((response) => {
            const eventLat = response.data.features[0].center[0];
            const eventLng = response.data.features[0].center[1];
            //const address = response.data.features[0].place_name;
            setLng(eventLng);
            setLat(eventLat);

            const marker = new mapboxgl.Marker({element: elemRef.current})
              .setLngLat([response.data.features[0].center[0], response.data.features[0].center[1]])
              .addTo(map.current);
              
              // map.current.setCenter([response.data.features[0].center[0], response.data.features[0].center[1]]) // for center the map
              map.current.flyTo({center: [eventLat, eventLng]}) // for flying
          })
  }, []);
    
// useEffect(() => {   
//   if (!map.current) return;      //wait map to initialize ---->for the sidebar
//      map.current.on('move', () => {
//         setLng(map.current.getCenter().lng.toFixed(4));
//         setLat(map.current.getCenter().lat.toFixed(4));
//         setZoom(map.current.getZoom().toFixed(2));
//     });
// }, []);



  return (
    <div>
      {/* <div className="sidebar">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>*/}  {/* //sidebar with coordinates and zoom */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

