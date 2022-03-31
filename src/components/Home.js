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
    <Container fluid className="backgroundContainer">
      <Container className="searchContainer">
        <h1 id="mainPhrase">Book your healthcare appointment online</h1>{" "}
        <p id="subPhrase">
          Search and book instantly. It’s simple, secure and free !
        </p>
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
