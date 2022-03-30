import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import {
  faHospitalUser,
  faUserPlus,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
// import {} from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

import Register from "./Register.js";
import Login from "./Login.js";

//https://react-bootstrap.netlify.app/components/navbar/
function NavBar({ storageToken, updateStorageToken }) {
  // const [storageToken,updateStorageToken] = useState(localStorage.token)
  console.log(updateStorageToken);
  useEffect(() => console.log("rerendered"), [storageToken]);
  console.log(localStorage.token, "token");
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              findMeADoc <FontAwesomeIcon icon={faHospitalUser} />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/doctors">
                <Nav.Link>See Doctors</Nav.Link>
              </LinkContainer>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              {storageToken ? (
                //check with Niklas why does this run
                <>
                  <LinkContainer to="/users/edit">
                    <Nav.Link>
                      {" "}
                      Edit Profile <FontAwesomeIcon icon={faUserPen} />
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link
                    onClick={() => {
                      console.log("clicked");
                      localStorage.removeItem("token");
                      updateStorageToken(localStorage.token);
                    }}
                  >
                    {" "}
                    Logout{" "}
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/users/login">
                    <Nav.Link>
                      {" "}
                      Log in <FontAwesomeIcon icon={faIdCard} />
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/users/register">
                    <Nav.Link>
                      {" "}
                      Register <FontAwesomeIcon icon={faUserPlus} />
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
