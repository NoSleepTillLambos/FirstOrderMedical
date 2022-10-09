import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../CSS/Register.css";
import { useNavigate } from "react-router-dom";
import regImage from "../Assets/registerImage.png";
import { useState } from "react";
import axios from "axios";

function BasicExample() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    medicalaid: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:8888/api/addUser.php", inputs)
      .then(function (response) {
        console.log(response);

        if (response.status === 200) {
          navigate("/");
        }
      });
  };
  return (
    <>
      <h1>Register below and get the help you deserve</h1>
      <Form className="reg-form">
        <Form.Group className="mb-2 name-reg" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="please Enter your name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2 surname-reg">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            name="surname"
            type="text"
            placeholder="Enter your surname"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2 age-reg">
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            type="text"
            placeholder="Please enter your age"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2 gender-reg">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            name="gender"
            type="text"
            placeholder="Enter your gender"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2 email-reg">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Please enter email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 password-reg" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 password-reg">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            name="phone"
            type="number"
            placeholder="Phone number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2 aid-reg">
          <Form.Label>Medical Aid</Form.Label>
          <Form.Control
            name="medicalaid"
            type="email"
            placeholder="Medical aid"
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          id="submit-reg"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <img src={regImage} id="reg-img"></img>
    </>
  );
}

export default BasicExample;
