import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ doctorData }) => {
  console.log(doctorData);

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

  mapboxgl.accessToken =
    "pk.eyJ1IjoianBhcmswMjI0IiwiYSI6ImNsMWI3cWF3bTA1NWQzZHBia2FvM3hmb3QifQ.WCZsUVFd574rEp88K7TEfA";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.11);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current || !doctorData.length) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    for (const doctor of Object.values(doctorData)) {
      // create a HTML element for each feature
      // make a marker for each feature and add it to the map
      new mapboxgl.Marker()
        .setLngLat(doctor.address.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h4>${doctor.fullName}</h4>
          <ul>
          <li>${doctor.address.addressLine1}</li>
          <li>${doctor.address.town}</li>
          <li>${doctor.address.country}</li>
          <li>${doctor.address.postcode.toUpperCase()}</li>
        </ul>`)
        )
        .addTo(map.current);
    }

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [doctorData]);

  return <div ref={mapContainer} className="map" />;
};

export default Map;
