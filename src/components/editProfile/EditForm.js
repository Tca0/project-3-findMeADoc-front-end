import axios from 'axios'
import {useState,useEffect} from 'react'

import EditPatient from './EditPatient'
import EditDoctor from './EditDoctor'


const EditForm = ({token,collection,id,model,role}) =>{

    const [userInfo,setUserInfo] = useState({model})
    useEffect(async ()=>{
        await fetch(`https://findmeadoc.herokuapp.com/${collection}/${id}`,{
            "headers":{
                "Authorization" :`Bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            setUserInfo({...json})
        })
    },[])

    if(role==="patient") return <EditPatient profileInformation={userInfo} collection={collection} id={id} token={token} />
    if(role==="doctor") return <EditDoctor profileInformation={userInfo} collection={collection} id={id} token={token}/>
    

}


export default EditForm