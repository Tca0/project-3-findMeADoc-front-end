import EditForm from './EditForm'

const EditPage = () =>{
    if(!localStorage.token){
        return <h1>You need to be logged in to edit profile</h1>
    }

    const patientModel = {
        // firstName:null,
        // secondName:null,
        // fullName:null,
        // DOB:null,
        // gender:null,
        // address:{
        //     addressLine1:null,
        //     addressLine2:null,
        //     town:null,
        //     country:null,
        //     postcode:null,
        //     enteredDate:null,
        // },
        // registerAt:null,
        // phone:null,
        // email:null,
        // completedAt:null,
        // completed:null,
    }
    const doctorModel = {

    }

    const token = localStorage.token
    const tokenPayload = JSON.parse(atob(token.split('.')[1]))

    const apiParams={
        collection:null,
        id:null,
        model:null
    }
    if(tokenPayload.role==="patient"){
        console.log("setting patient params")
        apiParams.collection = "patients"
        apiParams.id = tokenPayload.patientID
        apiParams.model = patientModel
    } else if(tokenPayload.role==="doctor"){
        console.log("setting doctors params")
        apiParams.collection = "doctors"
        apiParams.id = tokenPayload.doctorID
        apiParams.model = patientModel
    }


    return <EditForm 
        token={token}
        collection={apiParams.collection}
        id={apiParams.id}
        model={apiParams.model}
        role={tokenPayload.role}
    />
}

export default EditPage