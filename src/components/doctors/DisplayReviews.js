import {useState,useEffect} from 'react'
import {CardGroup, Card} from 'react-bootstrap'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'
import {faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DisplayReviews({reviews}){
    if(!reviews || reviews.length<1) return<></>
    return <>
        {reviews.map((review,i)=>{
            const starsReceived = review.rate
            return <Card key ={i}>
                <Card.Header>
                    {[...Array(5)].map((e,i)=>{
                        console.log(i)
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
                        <cite title="Source Title">{review.user}</cite>
                    </footer>
                    </blockquote>
                </Card.Body>
                </Card>
        })}
    </>
}

export default DisplayReviews