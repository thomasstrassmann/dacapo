import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import upload from "../../assets/icons/upload.svg";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router";

function InstrumentCreateForm() {
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
    formData.append("image", imageUpload.current.files[0]);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);

    try {
      const { data } = await axiosReq.post("/instruments/", formData);
      history.push(`/instruments/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const inputFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={brand}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.brand?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          value={category}
          onChange={handleChange}
          aria-label="Select the instrument category"
        >
          <option>Please select a category</option>
          <option value="guitar">Guitar</option>
          <option value="bass">Bass</option>
          <option value="drums">Drums</option>
          <option value="piano">Piano</option>
          <option value="brass instruments">Brass instruments</option>
          <option value="other">Other</option>
        </Form.Select>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {
          history.goBack();
        }}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={upload}
                    message="Click here to upload an image of your instrument"
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

            <div className="d-md-none">{inputFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{inputFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default InstrumentCreateForm;