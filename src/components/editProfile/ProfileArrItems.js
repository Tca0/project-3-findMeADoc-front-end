import {Badge,Form, Row, Col,Button, InputGroup, FormControl, Container, ButtonGroup} from 'react-bootstrap'
import {faSquareMinus, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState,useEffect} from 'react'


const ProfileArrItems = ({formData,onChangeArray,array, add}) =>{
    const [arrItems, setArrItems] = useState(formData[array])
    const [currentValue,setCurrentValue] = useState("")
    const [specialties, setSpecialty] = useState([])

    useEffect(()=>{
        if(arrItems.length!==formData[array].length){

            // console.log(arrItems,"arrItems")
            // console.log(formData[array],"form array")
            onChangeArray(array,arrItems)
            // console.log(formData,"afterupdate")
        }
    },[arrItems,formData])

    useEffect(async () => {
        if(add==="speciality"){
            await fetch("https://findmeadoc.herokuapp.com/specialties")
              .then((resp) => resp.json())
              .then((data) => {
                //   console.log(data[0].specialties)
                  setSpecialty(data[0].specialties)});

        }
      }, []);

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
        const updateArr = [...arrItems]
        const index = e.target.classList[0]
        updateArr.splice(index,1)
        console.log("clicked")
        console.log(e.target)
        console.log(e.target.value)
        console.log(e.target.classList)
        console.log(e.target.classList[0])
        setArrItems(updateArr)

    }

    if(!arrItems || arrItems.length<1) return <h1>No {array}</h1>
    return <>
        <Row>
            <div>
            {arrItems.map((item,i)=>{
                return <Badge pill bg="secondary" key={i}>{item} 
                    <span 
                    className={i}
                    value={i} 
                    onClick={removeItem}> 
                    {/* <FontAwesomeIcon 
                    icon={faSquareMinus} /> */}   &#x02A2F;
                    </span> 
                    </Badge>
            })}
            </div>
            {add==="speciality"?
            <Form.Select aria-label="Default select example" onChange={(e)=>setArrItems([...arrItems,...[e.target.value]])}>
                {specialties.map((specialty,i)=>{
                    return <option value={specialty} key={i} >{specialty} </option>
                })}
            </Form.Select>
            :
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
                Add a {add} 
                {/* <FontAwesomeIcon
                icon={faSquarePlus} /> */}
                </Button>
            </InputGroup>}
        </Row>
    </>
}

export default ProfileArrItems