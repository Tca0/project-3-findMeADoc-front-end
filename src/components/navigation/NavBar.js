import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faHospitalUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
// import {} from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Register from "./Register.js"
import Login from "./Login.js"
import Doctors from "../Doctors.js"

//https://react-bootstrap.netlify.app/components/navbar/
function NavBar(){
    return <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">findMeADoc     <FontAwesomeIcon icon={faHospitalUser} /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      {/* <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Nav>
      <Nav.Link href="/users/login">Log in <FontAwesomeIcon icon={faUser}/></Nav.Link>
      <Nav.Link href="/users/register">Register <FontAwesomeIcon icon={faUserPlus}/></Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar></>
}
export default NavBar