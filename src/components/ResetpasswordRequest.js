import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function ResetpasswordRequest() {
  const backEndLink = process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : "http://localhost:4000";
  console.log("backend URL", backEndLink);

  const [email, setEmail] = useState({ email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [response, setSResponse] = useState("");
  const [status, setResStatus] = useState(false);
  const onChange = (e) => {
    setResStatus(false);
    setSResponse("");
    setEmail({ email: e.target.value });
    console.log(e.target.value);
  };
  console.log(email);
  const validateForm = () => {
    let errors = {};
    if (!email.email) {
      errors.email = "email address required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.email)) {
      errors.email = "Email address is invalid";
    }
    setFormErrors(errors);
    console.log(Object.keys(errors).length, "number of errors");
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (e) => {
    validateForm();
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.put(
          `${backEndLink}/users/forgotPassword`,
          email
        );
        console.log(res);
        if (res.status === 200) {
          setSResponse(res.data.message);
          setResStatus(true);
          console.log("response to display", response);
          console.log(status);
        }
      } catch (err) {
        console.log(err.response.data.message);
        setSResponse(err.response.data.message);
        setResStatus(false);
        console.log("response to display",response);
        console.log(status);
      }
    }
  };
  return (
    <div className="RestPassword-container">
      <div className="forgotPassword">
        <form className="RestPassword-form" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email.email}
            onChange={onChange}
            style={formErrors.email && { border: "2px solid red" }}
          />
          <Button variant="outline-danger" size="lg" type="submit">
            Send
          </Button>
        </form>
        <div className="forgotRes">
          {!status ? (
            <p style={{ color: "red" }}>{response}</p>
          ) : (
            <p>{response}</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ResetpasswordRequest;
