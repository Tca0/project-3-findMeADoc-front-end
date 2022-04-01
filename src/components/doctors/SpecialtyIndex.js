import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorsIndexCard from "./DoctorsIndexCard.js";
import Map from "../mapbox/Map.js";
import { Container, Row, Stack, Col } from "react-bootstrap";

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

  if (Object.keys(doctorData)[0] === "message") {
    return (
      <>
        <div>{Object.values(doctorData)[0]}</div>
      </>
    );
  }
  return (
    <section className="doctorsIndex">
      <header></header>
      <Container>
        <Row>
          <Col>
            <Stack gap={3} className="g-4">
              {doctorData ? (
                doctorData.map((doctor) => (
                  <DoctorsIndexCard key={doctor._id} {...doctor} />
                ))
              ) : (
                <p>...loading</p>
              )}
            </Stack>
          </Col>

          <Col>{<Map doctorData={doctorData} />}</Col>
        </Row>
      </Container>
      <footer></footer>
    </section>
  );
};

export default DoctorsIndex;
