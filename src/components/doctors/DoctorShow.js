import React from "react";
import { useParams } from "react-router-dom";
import DoctorShowMap from "../mapbox/DoctorShowMap.js";
import { Container } from "react-bootstrap";
import DisplayReviews from "./DisplayReviews";
import { Card, ListGroup, Button, Col, Stack } from "react-bootstrap";

function DoctorShow() {
  const [doctor, setDoctor] = React.useState(undefined);
  const { doctorID } = useParams();

  React.useEffect(() => {
    fetch(`https://findmeadoc.herokuapp.com/doctors/${doctorID}`)
      .then((resp) => resp.json())
      .then((data) => setDoctor(data));
  }, [doctorID]);

  return (
    <section className="doctorShow">
      <header></header>
      {doctor ? (
        <Container>
          <Stack direction="vertical" gap={3}>
            <Card key={doctor._id}>
              <Stack direction="horizontal" gap={3}>
                <Col xs={12} md={8}>
                  <Card.Body className="cardContent">
                    <Card.Header id="header">{doctor.fullName}</Card.Header>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <h5>Specialities:</h5>
                        <ul>
                          {doctor.specialties.map((element, i) => (
                            <li key={i}>{element}</li>
                          ))}
                        </ul>
                      </ListGroup.Item>

                      <Card.Text>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <h5>Languages:</h5>
                            <ul>
                              {doctor.languages.map((element, i) => (
                                <li key={i}>{element}</li>
                              ))}
                            </ul>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h5>Address:</h5>
                            <ul>
                              {doctor.address.addressLine2 && (
                                <li>{doctor.address.addressLine2}</li>
                              )}
                              <li>{doctor.address.addressLine1}</li>
                              <li>{doctor.address.town}</li>
                              <li>{doctor.address.country}</li>
                              <li>{doctor.address.postcode.toUpperCase()}</li>
                            </ul>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Text>
                    </ListGroup>

                    <Button variant="primary">Book appointment</Button>
                  </Card.Body>
                </Col>
                <Col xs={6} md={4}>
                  {<DoctorShowMap {...doctor} />}
                </Col>
              </Stack>
            </Card>
            <DisplayReviews reviews={doctor.reviews} />
          </Stack>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
      <footer></footer>
    </section>
  );
}
export default DoctorShow;
