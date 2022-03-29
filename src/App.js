import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import NavBar from "./components/navigation/NavBar";
import Register from "./components/navigation/Register";
import Login from "./components/navigation/Login";
import DoctorsIndex from "./components/doctors/DoctorsIndex";
import Home from "./components/Home";

function App() {
  const [storageToken, updateStorageToken] = useState(localStorage.token);
  // lesson code
  const onLogout = () => {
    localStorage.removeItem("token");
    console.log("logged out");
  };
  return (
    <div className="App">
      <NavBar
        storageToken={storageToken}
        updateStorageToken={updateStorageToken}
      />
      {/* <FontAwesomeIcon icon={} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/register" element={<Register />} />
        <Route
          path="/users/login"
          element={<Login updateStorageToken={updateStorageToken} />}
        />
        {/* <Route path="/users/forgotPassword" element={<PasswordResest />} /> */}
        <Route path="/doctors" element={<DoctorsIndex />} />
        /*{" "}
      </Routes>
      {localStorage.getItem("token") && (
        <button onClick={onLogout}>Logout</button>
      )}

      <div>
        <Button variant="primary">Primary</Button>{" "}
        <Button variant="secondary">Secondary</Button>{" "}
        <Button variant="success">Success</Button>{" "}
        <Button variant="warning">Warning</Button>{" "}
        <Button variant="danger">Danger</Button>{" "}
        <Button variant="info">Info</Button>{" "}
        <Button variant="light">Light</Button>{" "}
        <Button variant="dark">Dark</Button>{" "}
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}

export default App;
