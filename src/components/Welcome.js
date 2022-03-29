import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const WelcomeRegistration = () => {
  const backEndLink = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:4000";
    console.log("backend URL", backEndLink);
    
    const [isConfirmed, setConfirmation] = useState(false)
    const [results, displayResults] = useState(null)
    const navigate = useNavigate();
    //to confirm registering get the code from link
    //send it to the backend then check response to display the right message
  const { code } = useParams();
  // console.log(code, typeof code);
  
  useEffect(() => {
    
      async function checkConfirmation() {
        try{
          const res = await fetch(
            `${backEndLink}/users/confirm/${code}/account`,
            {
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            }
          );
          console.log(res)
          console.log(res.status)
          // const text = await res.text();
          // console.log(text)
          const data = await res.json();
          console.log(data)
          console.log(data.message);
          if(res.status===200){
            setConfirmation(true);
            displayResults(
              "Thank you for registering in our service. Login in into your account to complete your information."
            );
          } else if(res.status === 201) {
            setConfirmation(true);
            displayResults(data.message);
          } else {
            displayResults(data.message);
          }
        } catch(error) {
          console.log(error.message)
        }
      }
      checkConfirmation()
  },[])
  console.log(isConfirmed, results)
  const loginPage = () => {
    console.log("hello")
    navigate("/users/login");
  }
  return (
    <div>
      <p>{results}</p>
      {isConfirmed && <button onClick={loginPage}>Login</button>}
    </div>
  );
};

export default WelcomeRegistration;
