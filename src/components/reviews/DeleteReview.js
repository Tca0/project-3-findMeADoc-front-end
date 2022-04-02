import {Button} from 'react-bootstrap'
import {useEffect} from 'react'
import axios from 'axios'

function DeleteReview({reviewID,doctorID,setDoctor}){
        async function handleClick(){
            console.log(`https://findmeadoc.herokuapp.com/doctor/${doctorID}/review/${reviewID}`)
            console.log(localStorage.token)
            console.log(reviewID)
            try{
                const res = await axios.delete(
                    `https://findmeadoc.herokuapp.com/doctor/${doctorID}/review/${reviewID}`,{
                        headers:{
                            "authorization":`Bearer ${localStorage.token}`
                        }
                    })
                    .then(res=>{
                        if(res.status===200){
                            const res = axios.get(
                                fetch(`https://findmeadoc.herokuapp.com/doctors/${doctorID}`)
                                .then((resp) => resp.json())
                                .then((data) => {
                                    setDoctor(data)})
                              )
                        }
                    })
                
            }catch(e){
                console.log(e)
            }
        }


    return <Button size="sm" variant="outline-danger" onClick={handleClick}>Danger</Button>
}

export default DeleteReview