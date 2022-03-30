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
          {doctor.specialties.map((element) => (
            <p key={element}>{element}</p>
          ))}
          {doctor.languages.map((element) => (
            <p key={element}>{element}</p>
          ))}
          {/* {doctor.address.map((element, i) => (
            // console.log(Object.values(element))
            <div key={i}>
              <p key={Object.values(element)[0]}>{Object.values(element)[0]}</p>
              <p key={Object.values(element)[2]}>{Object.values(element)[2]}</p>
              <p key={Object.values(element)[3]}>{Object.values(element)[3]}</p>
              <p key={Object.values(element)[4]}>{Object.values(element)[4]}</p>
            </div>
          ))} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
export default DoctorShow;
