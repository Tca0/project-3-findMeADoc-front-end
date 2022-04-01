import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorsIndexCard from "./DoctorsIndexCard.js";
import Map from "../mapbox/Map.js";
import SearchBar from "../search/SearchBar.js";
import { Container, Row, Stack, Col } from "react-bootstrap";

// import "dotenv/config";

// const backEndLink = process.env.BACKEND_CONNECTION
//   ? process.env.BACKEND_CONNECTION
//   : "http://localhost:4000";
// console.log(backEndLink);

const DoctorsIndex = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [specialtyData, setSpecialty] = useState([]);

  useEffect(() => {
    // fetch(`${backEndLink}/doctors`)
    fetch(`https://findmeadoc.herokuapp.com/doctors/`)
      .then((resp) => resp.json())
      .then((data) => setDoctorData(data));
  }, []);

  useEffect(() => {
    fetch("https://findmeadoc.herokuapp.com/specialties")
      .then((resp) => resp.json())
      .then((data) => setSpecialty(data));
  }, []);

  console.log(doctorData);

  return (
    <section className="doctorsIndex">
      <Container>
        <Stack gap={5}>
          <SearchBar
            placeholder="Speciality or doctor name"
            doctorData={doctorData}
            specialtyData={specialtyData}
          />
          <Row>
            <Col>
              <Stack gap={3} className="g-4">
                {doctorData ? (
                  doctorData.map((doctor) => (
                    <Col>
                      <DoctorsIndexCard key={doctor._id} {...doctor} />
                    </Col>
                  ))
                ) : (
                  <p>...loading</p>
                )}
              </Stack>
            </Col>
            <Col>{<Map doctorData={doctorData} />}</Col>
          </Row>
        </Stack>
      </Container>
      <footer></footer>
    </section>
  );
};

export default DoctorsIndex;
