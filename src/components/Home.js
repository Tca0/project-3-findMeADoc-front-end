import SearchBar from "./search/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import "../../src/App.css";
import { Container } from "react-bootstrap";

const Home = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [specialtyData, setSpecialty] = useState([]);

  useEffect(() => {
    // fetch(`${backEndLink}/doctors`)
    fetch(`https://findmeadoc.herokuapp.com/doctors/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const filteredData = data.filter((doctor) => {
          return doctor.completed == true;
        });
        console.log(filteredData, "filteredData");
        // console.log(data,"Data")
        setDoctorData(filteredData);
      });
  }, []);

  useEffect(() => {
    fetch("https://findmeadoc.herokuapp.com/specialties")
      .then((resp) => resp.json())
      .then((data) => setSpecialty(data));
  }, []);

  return (
    <Container fluid className="backgroundContainer">
      <Container className="searchContainer">
        <h1 id="mainPhrase">Find your best healthcare specialists online</h1>{" "}
        <p id="subPhrase">Search instantly. It’s simple, secure and free !</p>
        <div>
          <SearchBar
            placeholder="Speciality or doctor name"
            doctorData={doctorData}
            specialtyData={specialtyData}
          />
        </div>
      </Container>
    </Container>
  );
};

export default Home;
