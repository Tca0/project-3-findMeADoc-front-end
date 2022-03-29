import {Form, Row, Col,Button} from 'react-bootstrap'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const EditPatient = () =>{
    const [formData,setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)

    

}

export default EditPatient
// import {useNavigate} from 'react-router-dom'
// import {useState,useEffect} from 'react'
// import axios from 'axios'
// import {Form, Row, Col,Button} from 'react-bootstrap'



// const EditPage = ({token,collection,id,model,tokenPayload})=>{
//     const [userInfo,setUserInfo] = useState(model)
    

//     // const navigate = useNavigate()

//     const onChange = (e) =>{
//         // setFormData({...formData, [e.target.name]:e.target.value })
//     }
//     useEffect(async ()=>{
//         // await axios.get("https://findmeadoc.herokuapp.com/patients/6240d216d2f88c36d056bd67",{
//         //     headers:{
//         //         'Authorization':`token ${token}`
//         //     }
//         // }).then((res)=>{
//         //     console.log(res.data)
//         // })

        
//         await fetch(`https://findmeadoc.herokuapp.com/${collection}/${id}`, {
//             "headers": {
//                 "Authorization": `Bearer ${token}`
//             }
//             })
//             .then(resp => resp.json())
//             .then(json => {
//                 setUserInfo({...userInfo,...json})
//             })
//     },[])
    

//     // if(!formData.firstName){return <h1>Hi</h1>}
//     return <>
//             <h1>Hi</h1>
//             {!["patient","doctor"].includes(tokenPayload.role)?
//             <h1>You need to be logged in</h1>:
//             <h1>Logged in as {tokenPayload.role}</h1>}
//             {/* <Form>
//                 <Row className="mb-3">
//                     <Form.Group as={Col} controlId="formGridEmail">
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control onChange={onChange} value={formData.firstName} type="text" placeholder="Enter your first name" />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control type="password" placeholder="Password" />
//                     </Form.Group>
//                 </Row>

//                 <Form.Group className="mb-3" controlId="formGridAddress1">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control placeholder="1234 Main St" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formGridAddress2">
//                     <Form.Label>Address 2</Form.Label>
//                     <Form.Control placeholder="Apartment, studio, or floor" />
//                 </Form.Group>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} controlId="formGridCity">
//                     <Form.Label>City</Form.Label>
//                     <Form.Control />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridState">
//                     <Form.Label>State</Form.Label>
//                     <Form.Select defaultValue="Choose...">
//                         <option>Choose...</option>
//                         <option>...</option>
//                     </Form.Select>
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridZip">
//                     <Form.Label>Zip</Form.Label>
//                     <Form.Control />
//                     </Form.Group>
//                 </Row>



//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form> */}
        
//         </>
// }

// export default EditPage