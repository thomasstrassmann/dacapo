import React from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

import login from "../../assets/login.jpg"
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function LoginForm() {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Login</h1>

          <Form /*onSubmit={handleSubmit}*/>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control className={styles.Input} type="text" name="username" placeholder="Username" /*onChange={handleChange}  value={username}*//>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control className={styles.Input} type="password" name="password" placeholder="Password" /*onChange={handleChange}  value={username}*//>
            </Form.Group>

            <Button className={btnStyles.Button} type="submit">
              Login
            </Button>
          </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            You are not a DaCapo memeber yet? <span>Then sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={login}
        />
      </Col>
    </Row>
  );
}

export default LoginForm;
