import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../CSS/Register.css";
import regImage from "../Assets/registerImage.png";
import { useState } from "react";

function BasicExample() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };
  return (
    <>
      <h1>Register below and get the help you deserve</h1>
      <Form className="reg-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-2 name-reg" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Enter your name" />
        </Form.Group>
        <Form.Group className="mb-2 surname-reg" controlId="formBasicEmail">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="email" placeholder="Enter your surname" />
        </Form.Group>
        <Form.Group className="mb-2 age-reg" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control type="email" placeholder="Enter your age" />
        </Form.Group>
        <Form.Group className="mb-2 gender-reg" controlId="formBasicEmail">
          <Form.Label>Gender</Form.Label>
          <Form.Control type="email" placeholder="Enter your gender" />
        </Form.Group>
        <Form.Group className="mb-2 email-reg" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3 password-reg" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-2 aid-reg" controlId="formBasicEmail">
          <Form.Label>Medical Aid</Form.Label>
          <Form.Control type="email" placeholder="Medical aid" />
        </Form.Group>

        <Button variant="primary" type="submit" id="submit-reg">
          Submit
        </Button>
      </Form>
      <img src={regImage} id="reg-img"></img>
    </>
  );
}

export default BasicExample;
