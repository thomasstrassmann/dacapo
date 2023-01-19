import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import signup from "../../assets/signup.jpg";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");

  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { username, email, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/login");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={username}
                required
              />
            </Form.Group>

            {errors.username?.map((message, idx) => (
              <Alert variant="info" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="email">
              <Form.Label className="d-none">Email</Form.Label>
              <Form.Control
                className={styles.Input}
                type="email"
                name="email"
                placeholder="E-Mail address"
                onChange={handleChange}
                value={email}
                required
              />
            </Form.Group>

            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="info">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                name="password1"
                placeholder="Password"
                onChange={handleChange}
                value={password1}
                required
              />
            </Form.Group>

            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="info">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Password confirmation</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                name="password2"
                placeholder="Password confirmation"
                onChange={handleChange}
                value={password2}
                required
              />
            </Form.Group>

            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="info">
                {message}
              </Alert>
            ))}

            <Button className={btnStyles.Button} type="submit">
              Sign up for DaCapo
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="info" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/login">
            Already a DaCapo member? <span> Then login</span>
          </Link>
        </Container>
      </Col>

      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={signup} />
      </Col>
    </Row>
  );
};

export default SignUpForm;
