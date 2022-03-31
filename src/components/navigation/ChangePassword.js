import React from "react";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function ChangePassword() {
  // const backEndLink = process.env.REACT_APP_API
  //   ? process.env.REACT_APP_API
  //   : "http://localhost:4000";
  //if user logged in then change password will be activated in navbar
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [results, setResults] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({});
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
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.token;
        console.log(token);
        const userInfo = jwt_decode(token);
        console.log(userInfo.userId);
        const userId = userInfo.userId;
        const res = await axios.patch(
          `http://localhost:4000/users/${userId}/changePassword`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.json());
        console.log(res.status);
        console.log(res.data.message);
      } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
        setErrorMessage(e.response.data.message);
      }
    }
  };

  return (
    <div className="changePassword-container">
      <div className="changePassword-form">
        <form className="container" onSubmit={onSubmit}>
          <div className="row">
            <label htmlFor="oldPassword" className="col-6 col-md-4">
              Enter old password
            </label>
            <input
              className="col-6 col-sm-3"
              type="password"
              name="oldPassword"
              value={formData.password}
              onChange={onChange}
            />
            {formErrors.oldPassword && (
              <p className="col-6 col-sm-3" style={{ color: "red" }}>
                *
              </p>
            )}
            <div class="w-100"></div>
            <label htmlFor="newPassword" className="col-6 col-md-4">
              Enter new password
            </label>
            <input
              className="col-6 col-sm-3"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={onChange}
            />
            {formErrors.newPassword && (
              <p className="col-6 col-sm-3" style={{ color: "red" }}>
                *
              </p>
            )}
            <div class="w-100"></div>
            <label htmlFor="confirmPassword" className="col-6 col-md-4">
              Confirm password
            </label>
            <input
              className="col-6 col-sm-3"
              type="password"
              name="confirmPassword"
              value={formData.password}
              onChange={onChange}
            />
            {formErrors.confirmPassword && (
              <p className="col-6 col-sm-3" style={{ color: "red" }}>
                *
              </p>
            )}
            <div class="w-100"></div>
            <button type="submit">Set new password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
