import {Form, Row, Col,Button, InputGroup, FormControl} from 'react-bootstrap'

const ProfileArrItems = ({formData,onChange,array}) =>{
    console.log(onChange)
    function handleAdd(e){
        console.log(e.target)
    }
    if(!formData[array] || formData[array].length<1) return <h1>Loading</h1>
    return <>
        <Row>

            {formData[array].map((item,i)=>{
                return <h1>{item}</h1>
            })}
            //make inline submit to update local state
        </Row>
    </>
}

export default ProfileArrItems