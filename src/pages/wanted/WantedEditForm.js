import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/InstrumentCreateEditForm.module.css";
import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

function WantedEditForm() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [wanted, setWanted] = useState({
    title: "",
    description: "",
    category: "",
  });
  const { title, description, category } = wanted;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/wanted/${id}/`);
        const { title, description, category, is_owner } = data;

        is_owner
          ? setWanted({
              title,
              description,
              category,
            })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setWanted({
      ...wanted,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      await axiosReq.put(`/wanted/${id}`, formData);
      setShow(true);
      setTimeout(() => {
        history.push(`/wanted/${id}`);
      }, 1500);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const inputFields = (
    <div className="text-center">
      <Form.Group className={styles.FormGroup}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className={styles.FormGroup}>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
          aria-label="Select the instrument category"
          required
        >
          <option>Please select a category</option>
          <option value="guitar">Guitar</option>
          <option value="bass">Bass</option>
          <option value="drums">Drums</option>
          <option value="piano">Piano</option>
          <option value="brass instruments">Brass instruments</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className={styles.FormGroup}>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {show && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Wanted edited successfully!</Alert.Heading>
        </Alert>
      )}

      <Button
        className={btnStyles.CreateFormButton}
        onClick={() => {
          history.goBack();
        }}
      >
        cancel
      </Button>
      <Button className={btnStyles.CreateFormButton} type="submit">
        update
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className={appStyles.Row}>
        <Col className="p-0 p-md-2">
          <Container className={appStyles.Content}>{inputFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default WantedEditForm;
