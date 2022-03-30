// Code from lesson

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ updateStorageToken }) => {
  const backEndLink = process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : "http://localhost:4000";
  console.log("backend link", backEndLink);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  console.log(backEndLink);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({});
  };

  const navigate = useNavigate();
  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "email address required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "password required";
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
        console.log(formData);
        const res = await axios.post(`${backEndLink}/users/login`, formData);
        console.log(res);
        if (res.data.token) {
          console.log("Success");
          localStorage.setItem("token", res.data.token);
          updateStorageToken(localStorage.token);
          console.log(localStorage.token);
          navigate("/doctors");
        }
      } catch (e) {
        console.log(e);
        setErrorMessage(e.response);
      }
    }
  };
  const resetPassword = () => {
    navigate("/resetpasswordRequest");
  };
  return (
    <>
      <div className="login-page">
        <h1>Login</h1>
        {errorMessage && <div className="failure">{errorMessage}</div>}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={onChange}
            style={{ marginTop: "10px" }}
          />
          {formErrors.email && (
            <p className="text-warning">{formErrors.email}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            style={{ marginTop: "10px" }}
          />
          {formErrors.password && (
            <p className="text-warning">{formErrors.password}</p>
          )}
          <button type="submit" style={{ marginTop: "10px" }}>
            Login
          </button>
        </form>
        <div>
          <p style={{ marginTop: "10px" }}>
            Forgot your password{" "}
            <span
              onClick={resetPassword}
              style={{
                textDecoration: "underline",
                color: "purple",
                cursor: "pointer",
              }}
            >
              click to reset password
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
