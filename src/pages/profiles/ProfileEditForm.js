import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useUser, useSetUser } from "../../contexts/UserContext";
import BackButton from "../../components/BackButton";

const ProfileEditForm = () => {
  const user = useUser();
  const setUser = useSetUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const { username, email, phone, avatar } = profile;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (user?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { username, email, phone, avatar } = data;
          setProfile({ username, email, phone, avatar });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [history, id, user]);

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);

    if (imageFile?.current?.files[0]) {
      formData.append("avatar", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setUser((user) => ({
        ...user,
        profile_avatar: data.avatar,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label className="w-100 text-center">Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={handleChange}
          className={styles.TextFields}
          name="email"
        />
      </Form.Group>

      {errors?.email?.map((message, idx) => (
        <Alert variant="info" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className="w-100 text-center">Phone</Form.Label>
        <p className={styles.PhoneNote}>
          <strong>Caution:</strong> This phone number is displayed on your
          profile so that prospects can contact you by phone.
        </p>
        <Form.Control
          type="text"
          value={phone}
          onChange={handleChange}
          className={styles.TextFields}
          name="phone"
        />
      </Form.Group>

      {errors?.phone?.map((message, idx) => (
        <Alert variant="info" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`d-block mx-auto my-2 ${btnStyles.DefaultButton}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`d-block mx-auto ${btnStyles.DefaultButton}`}
        type="submit"
      >
        save
      </Button>
    </>
  );

  return (
    <>
      <Form className={styles.FormContainer} onSubmit={handleSubmit}>
          <Col>
            <Container>
              <Form.Group className={styles.ProfileEditContainer}>
                {avatar && (
                  <figure>
                    <Image src={avatar} fluid />
                  </figure>
                )}
                {errors?.avatar?.map((message, idx) => (
                  <Alert variant="info" key={idx}>
                    {message}
                  </Alert>
                ))}
                <div className="mx-auto">
                  <Form.Label
                    className={`mx-auto ${btnStyles.DefaultButton} ${btnStyles.ChangeAvatarButton}`}
                    htmlFor="image-upload"
                  >
                    Change the avatar
                  </Form.Label>
                </div>
                <Form.File
                  id="image-upload"
                  ref={imageFile}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setProfile({
                        ...profile,
                        avatar: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
              </Form.Group>
              <div className={` ${styles.ProfileEditContainer}`}>
                {textFields}
              </div>
            </Container>
          </Col>
      </Form>
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
      </div>
    </>
  );
};

export default ProfileEditForm;
