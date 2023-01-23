import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import styles from "../styles/Contact.module.css";
import btnStyles from "../styles/Button.module.css";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const Contact = ({query}) => {
  const [contactData, setContactData] = useState({
    text: "",
  });
  const { text } = contactData;
  const { id } = useParams();

  const [item, setItem] = useState({});
  const [itemOwnerMail, setItemOwnerMail] = useState("");
  const user = useUser();

  useEffect(() => {
    const handleMount = async () => {
        axios.get(`https://dacapo-api.herokuapp.com/${query}/${id}`)
        .then(response => {
          setItem(response.data);
          return axios.get(`https://dacapo-api.herokuapp.com/profiles/${response.data.profile_id}`)
        })
        .then (response => {
          setItemOwnerMail(response.data.email);
        }).catch(error => console.log(error.response));
    }
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
        SecureToken : "adf6a3e4-0246-41bf-8582-26f5979355f2",
        To: `${itemOwnerMail}`,
        From: "dacapo.service@gmail.com",
        Subject: `Interest in ${item.title}`,
        Body: `Message from ${user.username} (${user.email}): \n ${text}`,
      }).then((message) => alert(message));
    //   implement popup here
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
        <Button className={btnStyles.ContactButton} onClick={sendMail}>Send message</Button>
      </Form>
    </>
  )
};

export default Contact;
