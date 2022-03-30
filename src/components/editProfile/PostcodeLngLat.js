import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxGl from 'mapbox-gl';

import {Form,Col} from 'react-bootstrap'
import {useState,useEffect} from 'react'

function PostcodeLngLat({formData,onChangeAddress,setFormData}){
    const token =
    "pk.eyJ1IjoianBhcmswMjI0IiwiYSI6ImNsMWI3cWF3bTA1NWQzZHBia2FvM3hmb3QifQ.WCZsUVFd574rEp88K7TEfA"

    const [searchTerm,setSearchTerm] = useState(formData.address?formData.address.postcode:"")
    const [lng,setLng] = useState(null)
    const [lat,setLat] = useState(null)
    
    function updateForm(searchTerm,lng,lat,coordinates){
        const obj = {...formData}
        obj.address.coordinates=[]
        obj.address.postcode=searchTerm
        obj.address.lng=lng
        obj.address.lat=lat
        obj.address.coordinates.push(lng)
        obj.address.coordinates.push(lat)
        setFormData(obj)
    }

    useEffect(()=>{
        // if(!searchTerm){
        //     setSearchTerm(formData.address?formData.address.postcode:"")
        // }
        async function fetchGeocode(searchTerm) {
            console.log(searchTerm)
            const resp = await fetch(
            //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${token}`
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?country=gb&limit=1&types=place%2Cpostcode%2Caddress&language=en&&access_token=${token}`
            );
            const data = await resp.json();
          //   setGeocode(data);
            console.log(data);
            console.log(data.features);
            console.log(data.features[0]);
            console.log(data.features[0].geometry);
            console.log(data.features[0].geometry.coordinates);
            const coordinates = data.features[0].geometry.coordinates
            const [Lng,Lat] = data.features[0].geometry.coordinates;
            console.log(coordinates,"cooord")
            setLng(Lng)
            setLat(Lat)
            updateForm(searchTerm,Lng,Lat,coordinates)
            //   console.log(resp);
          }
          fetchGeocode(searchTerm)
          console.log(lng,lat,searchTerm,"params")
        //   updateForm()
    },[searchTerm])

    return <Form.Group as={Col} controlId="Postcode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control 
                    name="postcode"
                    value ={searchTerm} 
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    placeholder="E1 7PT"/>
                </Form.Group>
}

export default PostcodeLngLat