import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import upload from "../../assets/icons/upload.svg";

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/InstrumentCreateEditForm.module.css";
import appStyles from "../../App.module.css";

import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";
import { useRedirect } from "../../hooks/useRedirect";

function InstrumentCreateForm() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});

  const [instrumentData, setInstrumentData] = useState({
    title: "",
    description: "",
    image: "",
    brand: "",
    price: "",
    category: "",
  });
  const { title, description, image, brand, price, category } = instrumentData;

  const history = useHistory();
  const imageUpload = useRef(null);

  const handleChange = (event) => {
    setInstrumentData({
      ...instrumentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setInstrumentData({
        ...instrumentData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);

    if (image) {
      formData.append("image", imageUpload.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post("/instruments/", formData);
      history.push(`/instruments/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const bulletPoints = (
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
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={brand}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.brand?.map((message, idx) => (
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
          required
          aria-label="Select the instrument category"
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

      <Form.Group className={`${styles.Price} ${styles.FormGroup}`}>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />{" "}
        <span className={styles.Currency}>Euro</span>
      </Form.Group>
      {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  const descriptionButtons = (
    <>
          <Container className={appStyles.Content}>
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
            <div className={styles.ButtonContainer}>
            <Button
              className={btnStyles.CreateFormButton}
              onClick={() => {
                history.goBack();
              }}
            >
              cancel
            </Button>
            <Button className={btnStyles.CreateFormButton} type="submit">
              create
            </Button>
            </div>
          </Container>
    </>

  )

  return (
    <Form onSubmit={handleSubmit}>
      <Row className={styles.RowContainer}>
        <Col className="p-0 p-md-2" md={4} lg={5}>
          <Container
            className={`${appStyles.Content} ${styles.ImageWindow} d-flex flex-column justify-content-center`}
          >
            <div>{bulletPoints}</div>

            <Form.Group className={`text-center ${styles.ImageWindow}`}>
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label htmlFor="image-upload" className={btnStyles.ImageButton}>
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className={`d-flex justify-content-center ${btnStyles.ImageButton}`}
                  htmlFor="image-upload"
                >
                  <Asset
                    src={upload}
                    feedback="Click here to upload an image of your instrument"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                ref={imageUpload}
                onChange={handleChangeImage}
              />
            </Form.Group>

            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{descriptionButtons}</div>
          </Container>
        </Col>
        <Col md={6} lg={7} className="d-none d-md-block p-0 p-md-2">
        <div>{descriptionButtons}</div>
        </Col>
        
      </Row>
    </Form>
  );
}

export default InstrumentCreateForm;
