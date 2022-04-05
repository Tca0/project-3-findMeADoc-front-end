import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorsIndexCard from "./DoctorsIndexCard.js";
import Map from "../mapbox/Map.js";
import { Container, Row, Stack, Col } from "react-bootstrap";
import SearchBar from "../search/SearchBar.js";

// import "dotenv/config";

// const backEndLink = process.env.BACKEND_CONNECTION
//   ? process.env.BACKEND_CONNECTION
//   : "http://localhost:4000";
// console.log(backEndLink);

const SpecialtyDoctorsIndex = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [specialtyData, setSpecialty] = useState([]);
  const [specialtyDoctorData, setSpecialtyDoctorData] = useState([]);
  const { speciality } = useParams();

  useEffect(() => {
    // fetch(`${backEndLink}/doctors`)
    fetch(`https://findmeadoc.herokuapp.com/doctors/`)
      .then((resp) => resp.json())
      .then((data) => {
        const filteredData = data.filter((doctor) => {
          return doctor.completed == true;
        });
        setDoctorData(filteredData);
      });
  }, []);

  useEffect(() => {
    fetch("https://findmeadoc.herokuapp.com/specialties")
      .then((resp) => resp.json())
      .then((data) => setSpecialty(data));
  }, []);

  useEffect(() => {
    // fetch(`${backEndLink}/doctors`)
    fetch(
      `https://findmeadoc.herokuapp.com/doctors/search?speciality=${speciality}`
    )
      .then((resp) => resp.json())
      .then((data) => setSpecialtyDoctorData(data));
  }, []);

  if (Object.values(specialtyDoctorData)[0] === "No matching result found.") {
    return (
      <section className="noResult">
        <header></header>
        <h5>Sorry, we couldn’t find any professional for your search…</h5>
        <h5>Try with other search criteria.</h5>
        <SearchBar
          placeholder="Speciality or doctor name"
          doctorData={doctorData}
          specialtyData={specialtyData}
        />
        <footer></footer>
      </section>
    );
  }
  return (
    <section className="doctorsIndex">
      <header></header>
      <Container>
        <Row>
          <Col>
            <Stack gap={3} className="g-4">
              {specialtyDoctorData ? (
                specialtyDoctorData.map((doctor) => (
                  <DoctorsIndexCard key={doctor._id} {...doctor} />
                ))
              ) : (
                <p>...loading</p>
              )}
            </Stack>
          </Col>

          <Col>{<Map doctorData={specialtyDoctorData} />}</Col>
        </Row>
      </Container>
      <footer></footer>
    </section>
  );
};

export default SpecialtyDoctorsIndex;
