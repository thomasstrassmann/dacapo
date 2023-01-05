import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/dacapo-logo.png";
import login from "../assets/icons/login.svg";
import signup from "../assets/icons/signup.svg";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} fixed="top" expand="md">
      <Container>
        <NavLink to="/" exact>
        <Navbar.Brand>
          <img src={logo} alt="DaCapo Logo" height="55" />
        </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">
            <NavLink to="/login" className={styles.NavLink} activeClassName={styles.Active}>
              <img src={login} alt="login" height="30"/>Login
              </NavLink>
            <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
              <img src={signup} alt="signup" height="30"/>Sign up
              </NavLink>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;
