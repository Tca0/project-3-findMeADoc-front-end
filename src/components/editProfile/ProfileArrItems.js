import {Badge,Form, Row, Col,Button, InputGroup, FormControl, Container, ButtonGroup} from 'react-bootstrap'
import {faSquareMinus, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState,useEffect} from 'react'


const ProfileArrItems = ({formData,onChangeArray,array, add}) =>{
    
    const [arrItems, setArrItems] = useState(formData[array])
    const [currentValue,setCurrentValue] = useState("")
    const [options, setOptions] = useState([])

    useEffect(()=>{
        if(arrItems.length!==formData[array].length){

            // console.log(arrItems,"arrItems")
            // console.log(formData[array],"form array")
            onChangeArray(array,arrItems)
            // console.log(formData,"afterupdate")
        }
    },[arrItems,formData])

    useEffect(async () => {

        await fetch(`https://findmeadoc.herokuapp.com/${array}`)
            .then((resp) => resp.json())
            .then((data) => {
                array=="specialties"?
                setOptions(data[0].specialties):
                setOptions(data[0].languages)
            });

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
        setArrItems(arrItems.filter(item=>item!==e.target.dataset.item))
    }

    if(!arrItems || arrItems.length<1) return (
        <OptionsDropdown />
    )
    
    return <>
        <Row>
            <div>
            {arrItems.map((item,i)=>{
                return <Badge pill bg="secondary" key={i}>{item} 
                    <span 
                    data-item={item}
                    onClick={removeItem}> 
                    &#x02A2F;
                    </span> 
                    </Badge>
            })}
            </div>
            <OptionsDropdown />
        </Row>
    </>

function OptionsDropdown(){
    return <>
    <Form.Label>Add a {array=="specialties"?"specialty":"language"}: </Form.Label>
    <Form.Select aria-label="Default select example" onChange={(e)=>setArrItems([...arrItems,...[e.target.value]])}>
                {options.map((option,i)=>{
                    return <option value={option} key={i} >{option} </option>
                })}
    </Form.Select>
    </>
}
}



export default ProfileArrItems