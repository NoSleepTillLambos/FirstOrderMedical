import React from "react";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../CSS/Login.css";
import axios from "axios";

function CreateUser() {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8888/api/addUser.php", inputs)
      .then(function (response) {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(inputs);
  };

  return (
    <div>
      <Container>
        <h1 className="shadow-sm text-success mt-2 p-3 text-center rounded">
          Create account
        </h1>
        <Row className="mt-2">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="surname" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="contact" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="Username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" />
              </Form.Group>
              <Button variant="success btn-block" type="submit">
                Register user
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateUser;
