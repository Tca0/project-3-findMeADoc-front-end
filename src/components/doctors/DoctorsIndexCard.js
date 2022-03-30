import { Link } from "react-router-dom";

function DocrosIndexCard({ _id, fullName, languages, specialties, address }) {
  return (
    <div key={_id}>
      <Link to={`/doctors/${_id}`}>
        <h4>{fullName}</h4>
        <p>Specialities</p>
        <ul>
          {specialties.map((element, i) => (
            <li key={i}>{element}</li>
          ))}
        </ul>
        <p>Languages</p>
        <ul>
          {languages.map((element, i) => (
            <li key={i}>{element}</li>
          ))}
        </ul>
        <p>Address</p>
        <ul>
          {address.addressLine2 && <li>{address.addressLine2}</li>}
          <li>{address.addressLine1}</li>
          <li>{address.town}</li>
          <li>{address.country}</li>
          <li>{address.postcode.toUpperCase()}</li>
        </ul>
      </Link>
    </div>
  );
}

export default DocrosIndexCard;
