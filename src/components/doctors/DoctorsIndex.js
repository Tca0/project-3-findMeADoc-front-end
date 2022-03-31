import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorsIndexCard from "./DoctorsIndexCard.js";
import Map from "../mapbox/Map.js";
// import "dotenv/config";

// const backEndLink = process.env.BACKEND_CONNECTION
//   ? process.env.BACKEND_CONNECTION
//   : "http://localhost:4000";
// console.log(backEndLink);

const DoctorsIndex = () => {
  const [doctorData, setDoctorData] = useState([]);
  const { speciality } = useParams();

  useEffect(() => {
    // fetch(`${backEndLink}/doctors`)
    fetch(
      `https://findmeadoc.herokuapp.com/doctors/search?speciality=${speciality}`
    )
      .then((resp) => resp.json())
      .then((data) => setDoctorData(data));
  }, []);

  console.log(doctorData);

  return (
    <>
      <div>
        <div>
          {doctorData ? (
            doctorData.map((doctor) => (
              <DoctorsIndexCard key={doctor._id} {...doctor} />
            ))
          ) : (
            <p>...loading</p>
          )}
        </div>
      </div>
      <div>{<Map />}</div>
    </>
  );
};

export default DoctorsIndex;
