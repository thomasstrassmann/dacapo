import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/dacapo-logo.png";
import login from "../assets/icons/login.svg";
import signup from "../assets/icons/signup.svg";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} fixed="top" expand="md">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="DaCapo Logo" height="55" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link><img src={login} alt="login" height="30"/>Login</Nav.Link>
            <Nav.Link><img src={signup} alt="signup" height="30"/>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
