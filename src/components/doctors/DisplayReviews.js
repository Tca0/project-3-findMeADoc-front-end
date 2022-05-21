import { CardGroup, Card, Stack } from "react-bootstrap";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode";

import CreateNewReview from "./CreateNewReview";
import DeleteReview from "../reviews/DeleteReview";

function DisplayReviews({ reviews, doctorID, setDoctor }) {
  let userData;
  if (localStorage.token) {
    userData = jwt_decode(localStorage.token);
  }
  if (!reviews || reviews.length < 1)
    return (
      <CreateNewReview
        setDoctor={setDoctor}
        doctorID={doctorID}
        userData={userData}
      />
    );
  if (!userData) return <></>;

  return (
    <>
      <Stack gap={3} className="g-4">
        {reviews.map((review, i) => {
          console.log(review);
          if (i === 0) {
            console.log(review, "review");
            console.log(review.user._id, "created user id");
            console.log(review._id, "id review");
          }
          if (userData && userData.patientID) {
            console.log("patient");
            console.log(userData.patientID == review.user._id);
          }

          const starsReceived = review.rate;
          return (
            <>
              <Card key={i}>
                <Card.Header>
                  {[...Array(5)].map((e, i) => {
                    return (
                      <span key={i}>
                        {" "}
                        {i < starsReceived ? (
                          <FontAwesomeIcon icon={solidStar} />
                        ) : (
                          <FontAwesomeIcon icon={regularStar} />
                        )}
                      </span>
                    );
                  })}
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p> {review.comment} </p>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">{review.user.fullName}</cite>
                    </footer>
                  </blockquote>
                  {userData.patientID == review.user._id ? (
                    <DeleteReview
                      reviewID={review._id}
                      userData={userData}
                      doctorID={doctorID}
                      setDoctor={setDoctor}
                    />
                  ) : (
                    "no"
                  )}
                </Card.Body>
              </Card>
            </>
          );
        })}
        <CreateNewReview
          setDoctor={setDoctor}
          doctorID={doctorID}
          userData={userData}
        />
      </Stack>
    </>
  );
}

export default DisplayReviews;
