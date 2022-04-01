import React from "react";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function ChangePassword({ updateStorageToken }) {
  const backEndLink = process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : "http://localhost:4000";
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [results, setResults] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChanged, setChanged] = useState(false);
  const [isWriting, setUserStates] = useState(false)

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({});
    setChanged(false)
    setUserStates(true)
    console.log(formData);
  };
  const validateForm = () => {
    console.log("frontend validator");
    let errors = {};
    if (!formData.oldPassword) {
      errors.oldPassword = "Old Password required";
    }
    if (!formData.newPassword) {
      errors.newPassword = "new password required";
    }
    if (
      !formData.confirmPassword ||
      formData.newPassword !== formData.confirmPassword
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
    setUserStates(false)
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.token;
        console.log(token);
        const userInfo = jwt_decode(token);
        console.log(userInfo.userId);
        const userId = userInfo.userId;
        console.group(formData);
        const res = await axios.patch(
          `http://localhost:4000/users/${userId}/changePassword`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.status);
        console.log(res.data.message);
        setResults(res.data.message);
        setErrorMessage(null)
        setChanged(true);
        localStorage.removeItem("token");
        updateStorageToken(localStorage.token);
      } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
        setErrorMessage(e.response.data.message);
        setChanged(false);
      }
    }
  };

  return (
    <div className="changePassword">
      {isChanged ? (
        <div className="passwordChanged">
          <p>
            Successfully, {results} .<br /> Please re-login again
          </p>
        </div>
      ) : (
        <form className="changePassword-form" onSubmit={onSubmit}>
          {!isChanged && !isWriting && (
            <p style={{ color: "red", fontSize: "15px" }}>{errorMessage}</p>
          )}
          <input
            type="password"
            name="oldPassword"
            placeholder="old password"
            value={formData.password}
            onChange={onChange}
            style={formErrors.oldPassword && { border: "2px solid red" }}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="new password"
            value={formData.newPassword}
            onChange={onChange}
            style={formErrors.newPassword && { border: "2px solid red" }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={formData.password}
            onChange={onChange}
            style={formErrors.confirmPassword && { border: "2px solid red" }}
          />
          <button type="submit">Set new password</button>
        </form>
      )}
    </div>
  );
}
export default ChangePassword;
