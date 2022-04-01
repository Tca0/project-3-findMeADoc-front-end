import {useState,useEffect} from 'react'
import {Form, Button, FloatingLabel} from 'react-bootstrap'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'
import {faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios'

function CreateNewReview(){

    const [rating, setRating] = useState(undefined);
    const [hover, setHover] = useState(0);

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const token = localStorage.token
    const tokenPayload = JSON.parse(atob(token.split('.')[1]))

    function onChange(e){
        setFormData({ ...formData,comment:rating, [e.target.name]: e.target.value });
        console.log({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
   
          try {
            console.log(formData);
            const res = await axios.post(`https://findmeadoc.herokuapp.com/doctors/623f2f4d51320e742490cf5b/reviews`,
            formData,
            {"headers":{
                "Authorization" :`Bearer ${token}`
            }}
            )
            console.log(res)
            
          } catch (e) {
            console.log(e.response.data.message);
            setErrorMessage(e.response.data.message);
        }
      };

    return <>
        <Form onSubmit={onSubmit}>
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
                        setFormData({ ...formData,"rate":index, })
                        setRating(index)}}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                >
                    {index<=(hover || rating)? <FontAwesomeIcon icon={solidStar} /> : <FontAwesomeIcon icon={regularStar} />}
                    
                </button>
                )
            })}
        </div>

            <FloatingLabel controlId="comment" label="comment">
                <Form.Control
                name="comment"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                onChange={onChange}
                />
            </FloatingLabel>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}

export default CreateNewReview