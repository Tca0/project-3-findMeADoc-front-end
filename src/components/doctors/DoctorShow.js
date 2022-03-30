import React from "react";
import { useParams } from "react-router-dom";

function DoctorShow() {
  const [doctor, setDoctor] = React.useState(undefined);
  const { doctorID } = useParams();

  React.useEffect(() => {
    fetch(`https://findmeadoc.herokuapp.com/doctors/${doctorID}`)
      .then((resp) => resp.json())
      .then((data) => setDoctor(data));
  }, [doctorID]);

  return (
    <>
      {doctor ? (
        <div key={doctor._id}>
          <h1>This is a DoctorShow page</h1>
          <h4>{doctor.fullName}</h4>
          <p>Specialities</p>
          <ul>
            {doctor.specialties.map((element, i) => (
              <li key={i}>{element}</li>
            ))}
          </ul>
          <p>Languages</p>
          <ul>
            {doctor.languages.map((element, i) => (
              <li key={i}>{element}</li>
            ))}
          </ul>
          <p>Address</p>
          <ul>
            {doctor.address.addressLine2 && (
              <li>{doctor.address.addressLine2}</li>
            )}
            <li>{doctor.address.addressLine1}</li>
            <li>{doctor.address.town}</li>
            <li>{doctor.address.country}</li>
            <li>{doctor.address.postcode.toUpperCase()}</li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
export default DoctorShow;
