import React from "react";
import { Carousel, Container, Navbar, NavLink } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";

import carousel1 from "../../assets/carousel1.jpg";
import carousel2 from "../../assets/carousel2.jpg";
import carousel3 from "../../assets/carousel3.jpg";
import ProfilesOverview from "../profiles/ProfilesOverview";

import styles from "../../styles/Home.module.css"
import logo from "../../assets/dacapo-logo.png";
import { Link } from "react-router-dom";
import FollowedUsers from "./FollowedUsers";

function Home() {
  const user = useUser();

  return (
    <>
    {!user && 
      <>
      <Carousel>
        <Carousel.Item interval={7000}>
          <img
            className={styles.Carousel}
            src={carousel1}
            alt="Let B-Stock instruments resound again!"
          />
          <Carousel.Caption className={styles.Caption}>
            <h2>Let B-Stock instruments resound again!</h2>
            <p>Sell or buy instruments conveniently.</p>
            <p>No matter if guitar, bass, piano or tuba!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={7000}>
          <img
            className={styles.Carousel}
            src={carousel2}
            alt="Discover your new favorite instrument!"
          />
          <Carousel.Caption className={styles.Caption}>
            <h2>Discover your new favorite instrument!</h2>
            <p>
              Browse hundreds of B-Stock instruments at an unbeatable
              price-performance ratio!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={7000}>
          <img className={styles.Carousel} src={carousel3} alt="Contact buyers or post an instrument request!" />
          <Carousel.Caption className={styles.Caption}>
            <h2>Contact buyers or post an instrument request!</h2>
            <p>
              Use every opportunity to get closer to your dream instrument, even
              if it's not available yet.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className={styles.Introduction}>
        <h1>DaCapo - We value B-Stock instruments!</h1>
        <p>Da capo is an Italian playing instruction from music theory and means 
          "start from the beginning". And that's exactly what the instruments on DaCapo do: 
          they start over by changing hands as a pre-owned instrument. </p>

        <h4>To enjoy all the benefits of DaCapo, <Link to="/login" className={styles.Link}> log in </Link>  
          or <Link to="/signup" className={styles.Link}> create an account </Link> 
          and discover the wonderful world of second-hand instruments!</h4>
      </Container>
      </>
      }
      {user && 
      <>
      <h1 className="my-2 text-center">Welcome <span className={styles.Username}>{user.username}!</span></h1>
      <p className="my-2 text-center">My Dashboard</p>
      <Carousel>
        <Carousel.Item interval={7000}>
          <ProfilesOverview/>
        </Carousel.Item>
      </Carousel>

      <FollowedUsers/>
      </>
      }




      <Navbar className={styles.Footer}>
      <Container fluid className={styles.SocialLinks}>
        <NavLink to="/">
          Facebook
        </NavLink>
        <NavLink to="/">
          Instagram
        </NavLink>
        <NavLink to="/">
          Twitter
        </NavLink>

        <NavLink to="/" className={styles.BrandContainer}>
          <Navbar.Brand>
            <img src={logo} alt="DaCapo Logo" height="55" />
          </Navbar.Brand>
        </NavLink>
      </Container>
    </Navbar>
    </>
  );
}

export default Home;
