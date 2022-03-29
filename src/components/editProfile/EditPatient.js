import {Form, Row, Col,Button} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
// import {useNavigate} from 'react-router-dom'

const EditPatient = ({profileInformation,token,collection,id}) =>{
    const [formData,setFormData] = useState(profileInformation)
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(()=>{
        //will update the form fields with current info
        setFormData(profileInformation)},[profileInformation])
    const onChange = (e) =>{
            console.log(e.target)
            setFormData({...formData, [e.target.name]: e.target.value })
        }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            console.log(formData)
            const res = await axios.put(`https://findmeadoc.herokuapp.com/${collection}/${id}`,
            formData,
            {"headers":{
                "Authorization" :`Bearer ${token}`
            }}
            )
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }

    if(!formData.email) return <h1>Getting info</h1>
    return <>
        <h1>Edit Patient</h1>
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" value ={formData.firstName} onChange={onChange} type="text" placeholder="Enter your first name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
                </Form.Group>
            </Row>



            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
    

}

export default EditPatient



    



