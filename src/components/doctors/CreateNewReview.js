import { useState } from "react";
import { Form, Button, FloatingLabel, Card } from "react-bootstrap";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import jwt_decode from "jwt-decode";
import axios from "axios";

function CreateNewReview({ doctorID, setDoctor, userData }) {
  const [rating, setRating] = useState(undefined);
  const [hover, setHover] = useState(0);
  const [inputField, setInputField] = useState("");

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const token = localStorage.token;

  function onChange(e) {
    setInputField(e.target.value);
    setFormData({
      ...formData,
      comment: rating,
      [e.target.name]: e.target.value,
    });
    console.log({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({});
    console.log(formErrors);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const res = await axios.post(
        `https://findmeadoc.herokuapp.com/doctors/${doctorID}/reviews`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setRating(undefined);
      setFormData({});
      setInputField("");
      fetch(`https://findmeadoc.herokuapp.com/doctors/${doctorID}`)
        .then((resp) => resp.json())
        .then((data) => {
          setDoctor(data);
        });
    } catch (e) {
      console.log(e.response);
      setErrorMessage(e.response.data.message);
      console.log(errorMessage);
    }
  };
  if (!userData || userData.role === "doctor") return <></>;
  return (
    <Card>
      <Card.Body>
        <Card.Title>Leave a review:</Card.Title>
        <Form onSubmit={onSubmit}>
          <Card.Header>
            <div className="star-rating">
              <Form.Label>Rating</Form.Label>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => {
                      setFormData({ ...formData, rate: index });
                      setRating(index);
                    }}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    {index <= (hover || rating) ? (
                      <FontAwesomeIcon icon={solidStar} />
                    ) : (
                      <FontAwesomeIcon icon={regularStar} />
                    )}
                  </button>
                );
              })}
            </div>
          </Card.Header>
          <Card.Text>
            <FloatingLabel controlId="comment" label="comment">
              <Form.Control
                name="comment"
                as="textarea"
                placeholder="Leave a comment here"
                value={inputField}
                style={{ height: "100px" }}
                onChange={onChange}
              />
            </FloatingLabel>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Text>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateNewReview;
