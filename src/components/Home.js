import SearchBar from "./search/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const Home = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [specialtyData, setSpecialty] = useState([]);

  useEffect(() => {
    console.log("Running useEffect");
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

  useEffect(() => {
    fetch("https://findmeadoc.herokuapp.com/specialties")
      .then((resp) => resp.json())
      .then((data) => setSpecialty(data));
  }, []);

  return (
    <>
      <h1 onClick={() => setDoctorData("New data")}>
        Welcome to the doctors database
      </h1>
      <div>
        <SearchBar
          placeholder="Speciality or doctor name"
          doctorData={doctorData}
          specialtyData={specialtyData}
        />
      </div>
    </>
  );
};

export default Home;
