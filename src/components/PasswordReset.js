import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function ResetPassword() {
  const backEndLink = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:4000";
  // console.log("backend URL", backEndLink);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isErrorResponse, setResponseStatus] = useState(false)
  const [passwordSet, isPasswordSet] = useState(false)
  const { code } = useParams();
  console.log(code, typeof(code))
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({})
  };
  const validateForm = () => {
    let errors = {};
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
      console.log("password to be sent", formData);
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.patch(
          `${backEndLink}/users/resetPassword/${code}`,
          formData
        );
        console.log(res);
        const data = await res.json();
        console.log(data)
        isPasswordSet(true)
      } catch (err) {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
        setResponseStatus(true);
      }
    }
  };
  console.log(errorMessage);

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
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
          <button type="submit">Reset</button>
        </form>
      </div>
      <div>
        <b>
          {isErrorResponse && (
            <>
              <p style={{ color: "red", fontStyle: "bold" }}>{errorMessage}</p>
            </>
          )}
          {passwordSet && (
            <p>Password has been reset, please Login again to your account</p>
          )}
        </b>
      </div>
    </>
  );
}
export default ResetPassword;
