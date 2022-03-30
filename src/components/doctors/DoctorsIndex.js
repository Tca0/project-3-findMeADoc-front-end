import React from "react";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DoctorsIndexCard from "./DoctorsIndexCard";

// geocode related
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// popup offsets
const markerHeight = 50;
const markerRadius = 10;
const linearOffset = 25;
const popupOffsets = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -markerHeight],
  "bottom-left": [
    linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1,
  ],
  "bottom-right": [
    -linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1,
  ],
  left: [markerRadius, (markerHeight - markerRadius) * -1],
  right: [-markerRadius, (markerHeight - markerRadius) * -1],
};

const backEndLink = process.env.BACKEND_CONNECTION
  ? process.env.BACKEND_CONNECTION
  : "http://localhost:4000";
const DoctorsIndex = () => {
  const [doctorData, setDoctorData] = useState([]);

  //geocode related
  const [convertedPostcodesData, setConvertedPostcodesData] = useState([]);

  //geocode related
  function convertPostcodes() {
    if (!doctorData) return console.log("loading");
    const convertedPostcodes = doctorData.map((doctor) =>
      doctor.address.map((element, i) =>
        Object.values(element)[4].replace(/ /g, "_")
      )
    );
    setConvertedPostcodesData(convertedPostcodes);
  }

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${backEndLink}/doctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctorData(res.data);
      convertPostcodes();
    };
    getData();
  }, []);

  console.log(convertedPostcodesData);

  mapboxgl.accessToken =
    "pk.eyJ1IjoianBhcmswMjI0IiwiYSI6ImNsMWI3cWF3bTA1NWQzZHBia2FvM3hmb3QifQ.WCZsUVFd574rEp88K7TEfA";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.11);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(9);

  //geocode related
  const [geocode, setGeocode] = React.useState(undefined);
  const [markers, setMarkers] = useState([]);

  //geocode related
  React.useEffect(() => {
    async function fetchGeocode(postcode) {
      const resp = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=pk.eyJ1IjoianBhcmswMjI0IiwiYSI6ImNsMWI3cWF3bTA1NWQzZHBia2FvM3hmb3QifQ.WCZsUVFd574rEp88K7TEfA`
      );
      const data = await resp.json();
      setGeocode(data);
      console.log(data);
      console.log(resp);
    }
    convertedPostcodesData.forEach((postcode) => fetchGeocode(postcode));
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const marker1 = new mapboxgl.Marker()
      .setLngLat([-0.11, 51.5])
      .setPopup(
        new mapboxgl.Popup({
          offset: popupOffsets,
          className: "popup",
        }).setHTML("<h4>Doctor info</h4>")
      )
      .addTo(map.current);

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // geocode related
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  if (!doctorData) return <h1>Loading</h1>;
  return (
    <>
      <div>
        <h1>This is the doctors page</h1>
        <div>
          {/* {doctorData.length !== 0 ? (
            filterDoctors().map((doctor) => (
              <DoctorsIndexCard key={doctor._id} {...doctorData} />
            ))
          ) : (
            <p>...loading</p>
          )} */}
        </div>
      </div>
      <div>
        {/* <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div> */}
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
};

export default DoctorsIndex;
