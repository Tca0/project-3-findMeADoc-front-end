import React from "react";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function DeleteAccount({ updateStorageToken }) {
  const backEndLink = process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : "http://localhost:4000";
  const [formData, setFormData] = useState({
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isDeleted, setDeleted] = useState(false);
  const [isWriting, setUserStates] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({});
    setUserStates(true);
  };
  const validateForm = () => {
    let errors = {};
    if (!formData.password) {
      errors.password = "new password required";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = async (e) => {
    setUserStates(false);
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.token;
        console.log(token);
        const userInfo = jwt_decode(token);
        console.log(userInfo.userId);
        const userId = userInfo.userId;
        //In delete request the data and header goes inside one object
        const res = await axios.delete(
          `${backEndLink}/users/${userId}/delete`,
          {
            headers: { authorization: `Bearer ${token}` },
            data: formData,
          }
        );
        console.log(res.status);
        console.log(res.data.message);
        setErrorMessage(null);
        localStorage.removeItem("token");
        updateStorageToken(localStorage.token);
        setDeleted(true);
      } catch (e) {
        console.log(e);
        console.log(e.response.data.message);
        setErrorMessage(e.response.data.message);
        setDeleted(false);
      }
    }
  };
  return (
    <div className="deletePage">
      <div className="secondContainer">
        {isDeleted ? (
          <div className="results">
            <p style={{fontSize: "30px"}}>Your account has been deleted.</p>
          </div>
        ) : (
          <div>
            <div>
              {!isDeleted && !isWriting && (
                <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
              )}
            </div>
            <form className="delete" onSubmit={onSubmit}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={onChange}
                style={formErrors.password && { border: "2px solid red" }}
              />
              <button type="submit" style={{ marginLeft: "15px" }}>
                Delete Account
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
export default DeleteAccount;
