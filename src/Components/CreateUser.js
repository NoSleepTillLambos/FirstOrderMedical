import React from "react";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../CSS/Login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import MiniModalLeft from "./MiniModalLeft";
import MiniModalRight from "./MiniModalRight";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Okay from "../Assets/okay.svg";
import NotOkay from "../Assets/notOkay.svg";

function CreateUser() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const [capture, setCapture] = useState({
    first: "",
    last: "",
    contact: "",
    username: "",
    password: "",
    passwordCon: "",
  });

  const [nameError, setNameError] = useState();
  const [lastError, setLastError] = useState();
  const [emailError, setEmailError] = useState();
  const [contactError, setContactError] = useState();
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordConError, setPasswordConError] = useState();

  // checking if the users email and username is available
  const [emailAvail, setEmailAvail] = useState();
  const [userAvail, setUserAvail] = useState();

  const [emailIcon, setEmailIcon] = useState();
  const [userIcon, setUserIcon] = useState();

  const firstVal = (e) => {
    const value = e.target.value;

    setCapture({ ...capture, first: value });
    if (capture.first !== "") {
      setNameError();
    }
  };

  const lastVal = (e) => {
    const value = e.target.value;

    setCapture({ ...capture, last: value });
    if (capture.last !== "") {
      setLastError();
    }
  };

  const emailVal = (e) => {
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const value = e.target.value;
    setCapture({ ...capture, email: value });
    if (capture.email !== "") {
      setEmailError();
    }
    if (!value.match(mailRegex)) {
      setEmailError(<MiniModalLeft message="email is not a valid format" />);
    }
  };

  // CHECK IF EMAIL IS CORRECT AND AVAILABLE

  const validateEmail = () => {
    axios
      .post("http://localhost:80/api?authenticateEmail.php", inputs)
      .then(function (response) {
        console.log(response);

        if (response.data === "Available") {
          setEmailIcon(<TiTick />);
          setEmailAvail();
        } else if (response.data === "Not Available") {
          setEmailIcon(<ImCross />);
          setEmailAvail(<MiniModalRight message="email is not available" />);
        } else if (response.data === "") {
          setEmailIcon();
          setEmailAvail();
          setEmailError();
        }
      });
  };

  // CHECK IF USERNAME IS AVAILABLE

  const validateUser = () => {
    axios
      .post("http://localhost:80/api?authenticateUser.php", inputs)
      .then(function (response) {
        console.log(response);

        if (response.data === "Available") {
          setUserIcon(Okay);
          setUserAvail();
        } else if (response.data === "Not Available") {
          setUserIcon(NotOkay);
          setEmailAvail(<MiniModalRight message="email is not available" />);
        } else if (response.data === "") {
          setUserIcon();
          setUserAvail();
          setUsernameError();
        }
      });
  };

  const contactVal = (e) => {
    const contactRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    const value = e.target.value;
    setCapture({ ...capture, contact: value });
    if (capture.contact !== "") {
      setEmailError();
    }
    if (!value.match(contactRegex)) {
      setContactError(<MiniModalRight message="Not a valid contact number" />);
    }
  };

  const usernameVal = (e) => {
    const value = e.target.value.trim();

    setCapture({ ...capture, username: value });
    if (capture.username !== "") {
      setUsernameError();
    }
  };

  const passwordVal = (e) => {
    const passwordRegex = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;
    const value = e.target.value;
    setCapture({ ...capture, password: value });
    if (capture.password !== "") {
      setPasswordError();
    }
    if (!value.match(passwordRegex)) {
      setPasswordError(
        <MiniModalLeft message="Password must be at least 8 characters with a capital letter and number" />
      );
    }
  };

  const passwordConVal = (e) => {
    const value = e.target.value;
    setCapture({ ...capture, passwordCon: value });
    if (capture.password === value) {
      setPasswordConError();
    } else {
      passwordConError(<MiniModalLeft message="Your passwords do not match" />);
    }
  };

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

    if (capture.first === "") {
      setNameError(<MiniModalLeft message="Whats your name" />);
    } else {
      setNameError();
    }

    if (capture.last === "") {
      setLastError(<MiniModalRight message="Whats your surname" />);
    } else {
      setLastError();
    }
    if (capture.email === "") {
      setEmailError(<MiniModalLeft message="You must provide an email" />);
    } else {
      setEmailError();
    }
    if (capture.contact === "") {
      setContactError(
        <MiniModalRight message="You must provide a contact number" />
      );
    } else {
      setContactError();
    }
    if (capture.password === "") {
      setPasswordError(
        <MiniModalRight message="You must provide a password" />
      );
    } else {
      setPasswordError();
    }
    if (capture.passwordCon === "") {
      setPasswordConError(
        <MiniModalRight message="passwords need to match " />
      );
    } else {
      setPasswordConError();
    }

    let result = Object.values(capture).some((o) => o === "");

    if (result) {
      console.log("there is an error");
    } else {
      axios
        .post("http://localhost:80/api/addUser.php", inputs)
        .then(function (response) {
          console.log(response);

          if (response.status === 200) {
            navigate("/Doctors");
          }
        });
    }
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
                <Form.Control
                  name="name"
                  type="name"
                  onChange={(handleChange, firstVal)}
                />
                {nameError}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  name="surname"
                  type="surname"
                  onChange={(handleChange, lastVal)}
                />

                {lastError}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                {emailError}
                {emailAvail}
                <Form.Control
                  name="email"
                  type="email"
                  onChange={(handleChange, emailVal)}
                  onBlur={validateEmail}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                {contactError}
                <Form.Control
                  name="contact"
                  type="number"
                  onChange={(handleChange, contactVal)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                {usernameError}
                {userAvail}
                <Form.Control
                  name="username"
                  type="Username"
                  onChange={(handleChange, usernameVal)}
                  onBlur={validateUser}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                {passwordError}
                <Form.Control
                  name="password"
                  type="password"
                  onChange={(handleChange, passwordVal)}
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
