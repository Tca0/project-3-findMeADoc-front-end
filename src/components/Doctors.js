import axios from "axios";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

const Doctors = () => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://findmeadoc.herokuapp.com/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctorData(res.data);
    };
    getData();
  }, []);

  mapboxgl.accessToken =
    "pk.eyJ1IjoianBhcmswMjI0IiwiYSI6ImNsMWI3cWF3bTA1NWQzZHBia2FvM3hmb3QifQ.WCZsUVFd574rEp88K7TEfA";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.11);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(9);

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
        {doctorData.map((doctor, idx) => (
          <div className="movie-tile" key={idx}>
            <h4>{doctor.fullName}</h4>
            <p>{doctor.specialties}</p>
            <p>{doctor.languages}</p>
          </div>
        ))}
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

export default Doctors;
