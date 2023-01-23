import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import login from "../../assets/login.jpg"
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useSetUser } from "../../contexts/UserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function LoginForm() {
  const setUser = useSetUser();
  useRedirect("loggedIn");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;
  const [ errors, setErrors ] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", loginData);
      setUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };


  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Login</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control className={styles.Input} type="text" name="username" value={username} placeholder="Username" 
              onChange={handleChange} />
            </Form.Group>

            {errors.username?.map((message, idx) => (
              <Alert variant="info" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control className={styles.Input} type="password" name="password" placeholder="Password" 
              onChange={handleChange} value= {password} />
            </Form.Group>

            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="info">
                {message}
              </Alert>
            ))}

            <Button className={btnStyles.Button} type="submit">
              Login
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="info" className="mt-3">
                {message}
              </Alert>
            ))}

          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            You are not a DaCapo memeber yet? <span>Then sign up now!</span>
          </Link>
        </Container>
      </Col>

      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}>
        <Image className={`${appStyles.FillerImage}`} src={login}/>
      </Col>
    </Row>
  );
}

export default LoginForm;
