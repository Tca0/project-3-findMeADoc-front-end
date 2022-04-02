import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// a state to store entered data
const Register = () => {
  const backEndLink = process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : "http://localhost:4000";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  //a state to store errors by typing
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isRegistered, setRegistered] = useState(false);
  const [isSucceeded, setSucceeded] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({});
    console.log(formData);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post(`${backEndLink}/users/register`, formData);
        console.log(res.status);
        console.log("response", res.data.message);
        console.log(res.status);
        if (res.status === 200) {
          setSucceeded(true);
          setSuccessMessage(res.data.message);
        }
      } catch (e) {
        console.log(e.response.data.message);
        setErrorMessage(e.response.data.message);
        setRegistered(true);
      }
    }
  };
  const loginPage = () => {
    console.log("hello");
    navigate("/users/login");
  };
  return (
    <div className="registerPage">
      {isRegistered ? (
        <div className="results">
          {errorMessage && <h1>{errorMessage}</h1>}
          {isRegistered && (
            <Button variant="info" size="lg" onClick={loginPage}>
              Login
            </Button>
          )}
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          {isSucceeded && (
            <div className="results">
              <p className="success">
                Registration successful.
                <br />
                We sent you email to verify your account.
                <br />
                Check your email and click on the link, please
              </p>
            </div>
          )}
          {!isSucceeded && (
            <div
              className="register"
              style={{ height: "70%", padding: "50px" }}
            >
              <div>
                <h1 style={{ textAlign: "center" }}>Register</h1>
              </div>
              <form onSubmit={onSubmit} className="registrationForm">
                <div className="choose-role">
                  <input
                    type="radio"
                    value="doctor"
                    name="role"
                    onChange={onChange}
                  />
                  Doctor
                  <input
                    type="radio"
                    value="patient"
                    name="role"
                    defaultChecked
                    onChange={onChange}
                  />
                  Patient
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    style={formErrors.email && { border: "2px solid red" }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    style={formErrors.password && { border: "2px solid red" }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    style={
                      formErrors.confirmPassword && {
                        border: "2px solid red",
                      }
                    }
                  />
                </div>
                <div>
                  <Button variant="outline-dark" type="submit">
                    Register
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
