import React from "react";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../CSS/Login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function CreateUser() {
  const [inputs, setInputs] = useState({
    first: "",
    last: "",
    email: "",
    contact: "",
    username: "",
    password: "",
    passwordCon: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:80/api/addUser.php", inputs)
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
                <Form.Control name="name" type="name" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  name="surname"
                  type="surname"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  name="contact"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="Username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="success btn-block"
                type="submit"
                onClick={handleSubmit}
              >
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
