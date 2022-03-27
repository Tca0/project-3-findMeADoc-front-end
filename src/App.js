import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "./App.css"
import { Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import React from 'react'
import NavBar from './components/navigation/NavBar'
import Register from "./components/navigation/Register"
import Login from "./components/navigation/Login"
import Doctors from "./components/Doctors"


function App() {
  const [storageToken,updateStorageToken] = useState(localStorage.token)
  // lesson code
    const onLogout = () => {
    localStorage.removeItem("token");
    console.log("logged out");
  };
  return (
    <div className="App">
    <NavBar storageToken={storageToken} updateStorageToken={updateStorageToken}/>
    {/* <FontAwesomeIcon icon={} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login updateStorageToken={updateStorageToken}/>} />
        {/* <Route path="/users/forgotPassword" element={<PasswordResest />} /> */}
        <Route path="/doctors" element={<Doctors />} />
      /* </Routes>
      {localStorage.getItem("token") && (
        <button onClick={onLogout}>Logout</button>
      )}

      
      <div>
        <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '}
        <Button variant="warning">Warning</Button>{' '}
        <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
        <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}

const Home = () => {
  const [appData, setAppData] = useState(null);
  console.log(appData);
  return (
    <>
      <h1 onClick={() => setAppData("New data")}>
        Welcome to the doctors database
      </h1>
      <Link to="/users/login">Login</Link>
      <Link to="/users/register">Register</Link>
      <h5>{appData}</h5>
    </>
  );
};

export default App;
