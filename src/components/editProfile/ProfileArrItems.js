import {Form, Row, Col,Button, InputGroup, FormControl, Container, ButtonGroup} from 'react-bootstrap'
import {faSquareMinus, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState,useEffect} from 'react'


const ProfileArrItems = ({formData,onChangeArray,array, add}) =>{
    const [arrItems, setArrItems] = useState(formData[array])
    const [currentValue,setCurrentValue] = useState("")

    useEffect(()=>{
        if(arrItems.length!==formData[array].length){

            // console.log(arrItems,"arrItems")
            // console.log(formData[array],"form array")
            onChangeArray(array,arrItems)
            // console.log(formData,"afterupdate")
        }
    },[arrItems,formData])
    function handleAdd(e){
        setCurrentValue(e.target.value)
    }

    function handleSubmit(){
        console.log(currentValue)
        if(currentValue){
            // console.log("setting")
            setArrItems([...arrItems,...[currentValue]])
            setCurrentValue("")
        }
    }
    
    function removeItem(e){
        console.log("clicked")
        console.log(e.target)
        console.log(e.target.value)
    }

    if(!arrItems || arrItems.length<1) return <h1>No {array}</h1>
    return <>
        <Row>
            <ButtonGroup>
            {arrItems.map((item,i)=>{
                return <Col key={i}>
                    <Button variant="light" key={i}>{item} 
                    <span 
                    value={i}
                    onClick={removeItem}>
                    {/* <FontAwesomeIcon 
                    icon={faSquareMinus} /> */}
                    Remove
                    </span> 
                    </Button>
                </Col>
            })}
            </ButtonGroup>
            <InputGroup className="mb-3">
                <FormControl
                placeholder={`add a ${add}`}
                aria-label={`add a ${add}`}
                value={currentValue}
                onChange={handleAdd}
                />
                <Button 
                onClick={handleSubmit}
                variant="outline-secondary"
                id="add">
                add a {add} 
                <FontAwesomeIcon
                icon={faSquarePlus} />
                </Button>
            </InputGroup>
        </Row>
    </>
}

export default ProfileArrItems