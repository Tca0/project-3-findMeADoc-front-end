import {Form, Row, Col,Button} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
// import {useNavigate} from 'react-router-dom'

const EditPatient = ({profileInformation,token,collection,id}) =>{
    const [formData,setFormData] = useState(profileInformation)
    const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(()=>{
        setFormData(profileInformation)},[profileInformation])
    
        const onChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const onChangeAddress = (e) =>{
        const street=formData.address[e.target.name]=e.target.value
        setFormData({...formData,street })
        }

    function undefinedCheck(input){
        console.log(input)
        if(input) return input
        return ""
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            formData.fullName = `${formData.firstName } ${formData.secondName} `
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
                <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                name="firstName" 
                value ={formData.firstName} 
                onChange={onChange} type="text" 
                placeholder="First name" />
                </Form.Group>

                <Form.Group as={Col} controlId="secondName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                name="secondName" 
                value ={formData.secondName} 
                onChange={onChange} 
                type="text" 
                placeholder="Last Name" />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group 
                as={Col} 
                name="DOB" 
                onChange={onChange} 
                onClick={(e)=>{console.log(e.target.value)}}
                value={formData.DOB}>
                    <Form.Label>Select your Date of Birth</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="DOB" 
                    value={formData.DOB} 
                    onChange={onChange} 
                    placeholder="Date of Birth" />
                </Form.Group>

                <Form.Label as={Col} >Specify your gender
                <Form.Select
                    type="select"
                    name="gender"
                    defaultValue={formData.gender}
                    onChange={onChange}>
                    
                    <option hidden >Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </Form.Select></Form.Label>   

                <Form.Group as={Col} controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                name="phone" 
                value ={formData.phone} 
                onChange={onChange} 
                type="tel" 
                placeholder="020 3308 9506" />
                </Form.Group>
            </Row>
            

            <Row className="mb-3">
                <Form.Group as={Col} controlId="addressLine1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                    name="addressLine1"
                    value ={formData.address?formData.address.addressLine1:""} 
                    onChange={onChangeAddress}
                    placeholder="1st Floor, The Relay Building" />
                </Form.Group>

                <Form.Group as={Col} controlId="addressLine2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control 
                    name="addressLine2"
                    value ={formData.address?formData.address.addressLine2:""} 
                    onChange={onChangeAddress}
                    placeholder="114 Whitechapel High St" />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="town">
                    <Form.Label>Town</Form.Label>
                    <Form.Control 
                    name="town"
                    value ={formData.address?formData.address.town:""} 
                    onChange={onChangeAddress}
                    placeholder="London" />
                </Form.Group>

                <Form.Group as={Col} controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                    name="country"
                    value ={formData.address?formData.address.country:""} 
                    onChange={onChangeAddress}
                    placeholder="United Kingdom" />
                </Form.Group>

                //
                
                <Form.Group as={Col} controlId="Postcode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control 
                    name="postcode"
                    value ={formData.address?formData.address.postcode:""} 
                    onChange={onChangeAddress}
                    placeholder="E1 7PT"/>
                </Form.Group>
            </Row>



            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
    

}

export default EditPatient



    



