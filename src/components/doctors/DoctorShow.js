import React from "react";
import { useParams } from "react-router-dom";
import DoctorShowMap from "../mapbox/DoctorShowMap.js";
import { Container } from "react-bootstrap";
import DisplayReviews from './DisplayReviews'
import CreateNewReview from './CreateNewReview'

function DoctorShow() {
  const [doctor, setDoctor] = React.useState(undefined);
  const { doctorID } = useParams();

  React.useEffect(() => {
    fetch(`https://findmeadoc.herokuapp.com/doctors/${doctorID}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data,"data")
        setDoctor(data)});
  }, []);

  return (
    <>
      {doctor ? (
        <Container>
          <Container>
            <div key={doctor._id}>
              <h4>{doctor.fullName}</h4>
              <h5>Specialities</h5>
              <ul>
                {doctor.specialties.map((element, i) => (
                  <li key={i}>{element}</li>
                ))}
              </ul>
              <h5>Languages</h5>
              <ul>
                {doctor.languages.map((element, i) => (
                  <li key={i}>{element}</li>
                ))}
              </ul>
              <h5>Address</h5>
              <ul>
                {doctor.address.addressLine2 && (
                  <li>{doctor.address.addressLine2}</li>
                )}
                <li>{doctor.address.addressLine1}</li>
                <li>{doctor.address.town}</li>
                <li>{doctor.address.country}</li>
                <li>{doctor.address.postcode.toUpperCase()}</li>
              </ul>
              {console.log(doctor.address.coordinates)}
            </div>
          </Container>
          <Container>
          <div>{<DoctorShowMap {...doctor} />}</div>

          </Container>

          <Container>
            <DisplayReviews reviews={doctor.reviews}/>
            <CreateNewReview setDoctor={setDoctor} doctorID={doctorID}/>

          </Container>

        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
export default DoctorShow;
