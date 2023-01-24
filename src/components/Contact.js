import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import styles from "../styles/Contact.module.css";
import btnStyles from "../styles/Button.module.css";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const Contact = ({ query }) => {
  const [contactData, setContactData] = useState({
    text: "",
  });
  const { text } = contactData;
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  const [itemOwnerMail, setItemOwnerMail] = useState("");
  const user = useUser();

  useEffect(() => {
    const handleMount = async () => {
      axios
        .get(`https://dacapo-api.herokuapp.com/${query}/${id}`)
        .then((response) => {
          setItem(response.data);
          return axios.get(
            `https://dacapo-api.herokuapp.com/profiles/${response.data.profile_id}`
          );
        })
        .then((response) => {
          setItemOwnerMail(response.data.email);
        })
        .catch((error) => console.log(error.response));
    };
    handleMount();
  }, [id, itemOwnerMail, query]);

  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  const sendMail = () => {
    window.Email.send({
      SecureToken: "a04280d3-ba15-44ab-b67c-a9cc7a5dad4b",
      To: `${itemOwnerMail}`,
      From: "dacapo.service@gmail.com",
      Subject: `Interest in ${item.title}`,
      Body: `Message from ${user.username} - (${user.email}): \n ${text}`,
    }).then(() => setShow(true));
  };

  return (
    <>
      <Form className={styles.ContactForm}>
        <Form.Group controlId="text">
          <Form.Label className="d-none">Your message</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="text"
            className={styles.Message}
            onChange={handleChange}
            value={text}
            required
          />
        </Form.Group>
        {show && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Message sent!</Alert.Heading>
            <p>The seller got your message and will reach out to you!</p>
          </Alert>
        )}
        <Button className={btnStyles.ContactButton} onClick={sendMail}>
          Send message
        </Button>
      </Form>
    </>
  );
};

export default Contact;
