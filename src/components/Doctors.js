import axios from "axios"
import { useEffect, useState } from "react"

const Doctors = () => {
  const [doctorData, setDoctorData] = useState([])

  useEffect(() => {
    console.log("Running useEffect")
    const getData = async () => {
      const res = await axios.get("https://findmeadoc.herokuapp.com/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setDoctorData(res.data)
    }
    getData()
  }, [])
  console.log({ doctorData })
  if(!doctorData)return <h1>Loading</h1>
  return (
    <div>
      <h1>This is the doctors page</h1>
      {doctorData.map((doctor, idx) => (
        <div className="movie-tile" key={idx}>
          <h4>{doctor.fullName}</h4>
          <p>{doctor.specialities}</p>
          <p>{doctor.languages}</p>
        </div>
      ))}
    </div>
  )
}

export default Doctors