import axios from 'axios'
import {useState,useEffect} from 'react'

import EditPatient from './EditPatient'
import EditDoctor from './EditDoctor'

const EditForm = ({token,collection,id,model,role}) =>{
    const [num,setNum] = useState(0)

    const [userInfo,setUserInfo] = useState({model})
    useEffect(async ()=>{
        await fetch(`https://findmeadoc.herokuapp.com/${collection}/${id}`,{
            "headers":{
                "Authorization" :`Bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(json=>{
            const DOB = new Date (json.DOB)
            console.log(json)
            setUserInfo({...json, DOB:DOB.toLocaleDateString().split("/").reverse().join("-")})
        })
    },[num])
    if(role==="patient") return <EditPatient profileInformation={userInfo} collection={collection} id={id} token={token} />
    if(role==="doctor") return <EditDoctor profileInformation={userInfo} collection={collection} id={id} token={token} num={num} setNum={setNum}/>

}


export default EditForm