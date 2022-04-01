import {useState,useEffect} from 'react'
import {CardGroup, Card,Stack} from 'react-bootstrap'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'
import {faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DisplayReviews({reviews}){
    if(!reviews || reviews.length<1) return<></>
    return <>
        <Stack gap={3} className="g-4">
        {reviews.map((review,i)=>{
            if(i===0){
                console.log(review)
            }
            const starsReceived = review.rate
            return <>
                    <Card key ={i}>
                        <Card.Header>
                            {[...Array(5)].map((e,i)=>{
                                return <span key={i}> {i<starsReceived? <FontAwesomeIcon  icon={solidStar} /> : <FontAwesomeIcon icon={regularStar} />}</span>
                            })}
                        </Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                            <p>
                                {' '}
                                {review.comment}{' '}
                            </p>
                            <footer className="blockquote-footer">
                                <cite title="Source Title">{review.user.fullName}</cite>
                            </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    </>

        })}
        </Stack>
    </>
}

export default DisplayReviews