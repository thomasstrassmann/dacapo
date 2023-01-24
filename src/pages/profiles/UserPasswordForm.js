import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useUser } from "../../contexts/UserContext";
import BackButton from "../../components/BackButton";
import { useRedirect } from "../../hooks/useRedirect";

const UserPasswordForm = () => {
  useRedirect("loggedOut");
  const history = useHistory();
  const { id } = useParams();
  const user = useUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (user?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [history, id, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      setShow(true);
      setTimeout(() => {
        history.goBack();
      }, 1500);
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                autoComplete="off"
                className="text-center"
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="info">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                autoComplete="off"
                className="text-center"
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="info">
                {message}
              </Alert>
            ))}

            {show && (
              <Alert
                variant="success"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>Password changed successfully!</Alert.Heading>
              </Alert>
            )}

            <Button
              className={`d-block my-2 mx-auto ${btnStyles.DefaultButton}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={`d-block mx-auto ${btnStyles.DefaultButton}`}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
      </div>
    </>
  );
};

export default UserPasswordForm;
