import {useState,useEffect, useRef} from 'react'

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxGl from 'mapbox-gl';


function Testing(){
    const token =
    "pk.eyJ1IjoianBhcmswMjI0IiwiYSI6ImNsMWI3cWF3bTA1NWQzZHBia2FvM3hmb3QifQ.WCZsUVFd574rEp88K7TEfA";
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    // const mapContainer = useRef(null);
    const mapRef = useRef(null);

     //geocode related
    const [geocode, setGeocode] = useState(undefined);
    const [markers, setMarkers] = useState([]);

    // const [lng,setLng] = useState(null)
    // const [lat,setLat] = useState(null)

    useEffect(() => {
        async function fetchGeocode(postcode) {
          const resp = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/se167dl.json?access_token=${token}`
          );
          const data = await resp.json();
        //   setGeocode(data);
          console.log(data);
          console.log(data.features);
          console.log(data.features[0]);
          console.log(data.features[0].geometry);
          console.log(data.features[0].geometry.coordinates);
          const [Lng,Lat] = data.features[0].geometry.coordinates;
          setLng(Lng)
          setLat(Lat)
          //   console.log(resp);
        }
        fetchGeocode()
      }, []);

useEffect(()=>{
    console.log(lat,"lat")
    console.log(lng,"lng")
},[lng,lat])


    // const map = new mapboxGl.Map({
    //     container:"map",
    //     style: "mapbox://styles/mapbox/streets-v11"
    // })


    return <h1>Testing</h1>
}

export default Testing