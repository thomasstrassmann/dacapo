import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


import logo from "../assets/dacapo-logo.png";
import login from "../assets/icons/login.svg";
import signup from "../assets/icons/signup.svg";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../contexts/UserContext";

import piano from "../assets/icons/piano.svg";
import bookmarks from "../assets/icons/bookmarks.svg";
import wanted from "../assets/icons/wanted.svg";
import logout from "../assets/icons/logout.svg";
import axios from "axios";
import Avatar from "./Avatar";
import useToggle from "../hooks/useToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const user = useUser();
  const setUser = useSetUser();

  const { expanded, setExpanded, ref } = useToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setUser(null);
      removeTokenTimestamp();
    } catch (err) {
    }
  };

  const loggedInNav = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/instruments"
      >
        <img src={piano} alt="Instruments" height="30" />
        Instruments
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/bookmarks"
      >
        <img src={bookmarks} alt="Bookmarks" height="30" />
        Bookmarks
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/wanted"
      >
        <img src={wanted} alt="Wanted" height="30" />
        Wanted
      </NavLink>

      <NavLink
        className={styles.NavLinkProfile}
        to={`/profiles/${user?.profile_id}`}
      >
        <Avatar
          src={user?.profile_avatar}
          text={`${user?.username}`}
          height={30}
        />
      </NavLink>

      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <img src={logout} alt="Logout" height="30" />
        Logout
      </NavLink>
    </>
  );

  const loggedOutNav = (
    <>
      <NavLink
        to="/login"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <img src={login} alt="login" height="30" />
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <img src={signup} alt="signup" height="30" />
        Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      className={styles.NavBar}
      fixed="top"
      expand="lg"
      expanded={expanded}
    >
      <Container fluid>
        <NavLink to="/" exact className={styles.LogoContainer}>
          <Navbar.Brand>
            <img src={logo} alt="DaCapo Logo" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          ref={ref}
          aria-controls="basic-navbar-nav"
        />

        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav className={`ml-auto ${styles.LinkContainer}`}>
            {user ? loggedInNav : loggedOutNav}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
