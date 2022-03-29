import { Link } from "react-router-dom";

function DocrosIndexCard({ _id, fullName, languages, specialties, address }) {
  return (
    <div key={_id}>
      <Link to={`/doctors/${_id}`}>
        <h4>{fullName}</h4>
        {specialties.map((element) => (
          <p key={element}>{element}</p>
        ))}
        {languages.map((element) => (
          <p key={element}>{element}</p>
        ))}
        {address.map((element, i) => (
          // console.log(Object.values(element))
          <div key={i}>
            <p key={Object.values(element)[0]}>{Object.values(element)[0]}</p>
            <p key={Object.values(element)[2]}>{Object.values(element)[2]}</p>
            <p key={Object.values(element)[3]}>{Object.values(element)[3]}</p>
            <p key={Object.values(element)[4]}>{Object.values(element)[4]}</p>
          </div>
        ))}
      </Link>
    </div>
  );
}

export default DocrosIndexCard;
