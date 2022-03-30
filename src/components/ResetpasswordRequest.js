import React from "react";
import { useState } from "react";
import axios from "axios";

function ResetpasswordRequest() {
  const backEndLink = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:4000";
  // console.log("backend URL", backEndLink);

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
        }
      } catch (err) {
        console.log(err.response.data.message);
        setSResponse(err.response.data.message);
        setResStatus(false);
      }
    }
  };
  return (
    <div
      className="container"
      style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="forgotPassword">
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email.email}
            onChange={onChange}
          />
          {formErrors && <p className="text-warning">{formErrors.email}</p>}
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="forgotRes" style={{ marginTop: "20px" }}>
        {!status ? (
          <p style={{ color: "red" }}>{response}</p>
        ) : (
          <p>{response}</p>
        )}
      </div>
    </div>
  );
}
export default ResetpasswordRequest;
