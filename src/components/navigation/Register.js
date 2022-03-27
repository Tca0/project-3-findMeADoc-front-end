import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const res = await axios.post("https://findmeadoc.herokuapp.com/users/register", formData)
      console.log(res)
      if (res.status >= 200 && res.status < 300) {
        navigate("/login")
      }
    } catch (e) {
      setErrorMessage(e.response.data.message)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {errorMessage && <div className="failure">{errorMessage}</div>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register