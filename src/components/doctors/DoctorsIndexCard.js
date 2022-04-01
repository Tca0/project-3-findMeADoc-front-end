import { Link } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";

function DocrosIndexCard({ _id, fullName, languages, specialties, address }) {
  return (
    <Card style={{ width: "45rem" }} key={_id}>
      <Link to={`/doctors/${_id}`}>
        <Card.Body className="cardContent">
          <Card.Header id="header">{fullName}</Card.Header>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <h5>Specialities:</h5>
              <ul>
                {specialties.map((element, i) => (
                  <li key={i}>{element}</li>
                ))}
              </ul>
            </ListGroup.Item>

            <Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <h5>Languages:</h5>
                  <ul>
                    {languages.map((element, i) => (
                      <li key={i}>{element}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Address:</h5>
                  <ul>
                    {address.addressLine2 && <li>{address.addressLine2}</li>}
                    <li>{address.addressLine1}</li>
                    <li>{address.town}</li>
                    <li>{address.country}</li>
                    <li>{address.postcode.toUpperCase()}</li>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
            </Card.Text>
          </ListGroup>

          <Button variant="primary">Book appointment</Button>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default DocrosIndexCard;
