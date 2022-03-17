import "./MapMain.css";
import axios from "axios"
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_TOKEN;

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.17);
  const [lat, setLat] = useState(41.38);
  const [zoom, setZoom] = useState(12);
 
  useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat],
  zoom: zoom
  })
  
  ;
  }, []);
  
  
  
  
  
  
  return (
  <div>
  <div ref={mapContainer} className="map-container" />
  </div>
  );
}

