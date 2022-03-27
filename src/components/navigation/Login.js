// Code from lesson

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = ({updateStorageToken}) => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const res = await axios.post("https://findmeadoc.herokuapp.com/users/login", formData)
      console.log(res)
      if (res.data.token) {
        console.log("Success")
        localStorage.setItem("token", res.data.token)
        updateStorageToken(localStorage.token)
        console.log(localStorage.token)
        navigate("/doctors")
      }
    } catch (e) {
      setErrorMessage(e.response.data.message)
    }
  }
  return (
    <div className="login-page">
      <h1>Login</h1>
      {errorMessage && <div className="failure">{errorMessage}</div>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login