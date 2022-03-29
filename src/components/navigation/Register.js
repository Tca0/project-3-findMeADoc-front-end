import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// a state to store entered data
const Register = () => {
  const backEndLink = process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : "http://localhost:4000";
    console.log(process.env)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  //a state to store errors by typing
  const [formErrors, setFormErrors] = useState({}); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isRegistered, setRegistered] = useState(false);
  const [isSucceeded, setSucceeded] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    console.log(process.env.REACT_APP_API)
    console.log(backEndLink)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    console.log("frontend validator");
    let errors = {};
    if (!formData.email) {
      errors.email = "email address required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "password required";
    }
    if (
      !formData.confirmPassword ||
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "confirm password doesn't match";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  console.log("backend URL", backEndLink)
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post(`${backEndLink}/users/register`, formData);
        console.log(res.status);
        // const data = await res.json();
        // console.log(data.message, "from response");
        console.log("response", res.data.message);
        console.log(res.status);
        if (res.status === 200) {
          setSucceeded(true);
          setSuccessMessage(res.data.message)
        }
      } catch (e) {
        console.log(e.response.data.message);
        setErrorMessage(e.response.data.message);
        setRegistered(true);
      }
    }
  };
  console.log(isSucceeded);
  console.log(successMessage)
  console.log(isRegistered);
  const loginPage = () => {
    console.log("hello");
    navigate("/users/login");
  };
  return (
    <div>
      {isRegistered ? (
        <div>
          {errorMessage && <h1 className="failure">{errorMessage}</h1>}
          {isRegistered && <button onClick={loginPage}>Login</button>}
        </div>
      ) : (
        <>
          <div>
            {isSucceeded && (
              <p className="success">
                Registration successful.
                <br />
                We sent you email to verify your account.
                <br />
                Check your email and click on the link, please
              </p>
            )}
            {!isSucceeded && (
              <>
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                  />
                  {formErrors.email && (
                    <p className="text-warning">{formErrors.email}</p>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                  />
                  {formErrors.password && (
                    <p className="text-warning">{formErrors.password}</p>
                  )}
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onChange}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-warning">{formErrors.confirmPassword}</p>
                  )}
                  <button type="submit">Register</button>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
