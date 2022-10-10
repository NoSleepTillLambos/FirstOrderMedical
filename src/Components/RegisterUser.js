import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../CSS/Register.css";
import { useNavigate } from "react-router-dom";
import regImage from "../Assets/registerImage.png";
import MiniModalRight from "./MiniModalRight";
import { useState } from "react";
import axios from "axios";
import error from "../Assets/error.png";
import Valid from "../Assets/valid.png";

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    rank: "",
  });

  const [nameError, setNameError] = useState();
  const [surnameError, setSurnameError] = useState();
  const [ageError, setAgeError] = useState();
  const [genderError, setGenderError] = useState();
  const [contactError, setContactError] = useState();
  const [rankError, setRankError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const [emailAvail, setEmailAvail] = useState();

  const [emailIcon, setEmailIcon] = useState();

  const nameVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, name: value });

    if (inputs.name !== "") {
      setNameError();
    }
  };

  const surnameVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, surname: value });

    if (inputs.surname !== "") {
      setSurnameError();
    }
  };

  const ageVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, age: value });

    if (inputs.age !== "") {
      setAgeError();
    }
  };

  const genderVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, gender: value });

    if (inputs.gender !== "") {
      setGenderError();
    }
  };

  const emailVal = (e) => {
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const value = e.target.value;
    setInputs({ ...inputs, email: value });

    if (inputs.email !== "") {
      setEmailError();
    }

    if (!value.match(mailRegex)) {
      setEmailError(
        <MiniModalRight message="Email is not in a valid format: try joesoap@31.com" />
      );
    }
  };
  const passwordVal = (e) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;

    const value = e.target.value;
    setInputs({ ...inputs, password: value });

    if (inputs.password !== "") {
      setPasswordError();
    }
    if (!value.match(passRegex)) {
      setPasswordError(
        <MiniModalRight message="Password must include a number, special character, uppercase and lowercase letters and it must be at least 5 digits long." />
      );
    }
  };

  const phoneVal = (e) => {
    const contactRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    const value = e.target.value;
    setInputs({ ...inputs, phone: value });

    if (inputs.phone !== "") {
      setContactError();
    }
    if (!value.match(contactRegex)) {
      setContactError(<MiniModalRight message="Phone number is not valid." />);
    }
  };

  const rankVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, rank: value });

    if (inputs.rank !== "") {
      setRankError();
    }
  };

  const authenticateEmail = () => {
    axios
      .post("http://localhost:80/api/authenticateEmail.php", inputs)
      .then(function (res) {
        console.log(res);

        setEmailIcon();

        if (res.data === "Available") {
          setEmailIcon(Valid);
          setEmailAvail();
        } else if (res.data === "Not Available") {
          setEmailIcon(error);
          setEmailAvail(
            <MiniModalRight message="This email is not available." />
          );
        } else if (res.data === "") {
          setEmailIcon(error);
          setEmailAvail();
          setEmailError();
        }
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.name === "") {
      setNameError(<MiniModalRight message="What is your name?" />);
    } else {
      setNameError();
    }

    if (inputs.surname === "") {
      setSurnameError(<MiniModalRight message="What is your Surname?" />);
    } else {
      setSurnameError();
    }

    if (inputs.age === "") {
      setAgeError(<MiniModalRight message="How old are you?" />);
    } else {
      setAgeError();
    }

    if (inputs.gender === "") {
      setGenderError(<MiniModalRight message="Are you a male or female?" />);
    } else {
      setGenderError();
    }

    if (inputs.phone === "") {
      setContactError(
        <MiniModalRight message="You must provide a cellphone Number." />
      );
    } else {
      setContactError();
    }

    if (inputs.email === "") {
      setEmailError(
        <MiniModalRight message="You must provide an email address." />
      );
    } else {
      setEmailError();
    }

    if (inputs.rank === "") {
      setRankError(
        <MiniModalRight message="Are you a head receptionist or a normal receptionist?" />
      );
    } else {
      setRankError();
    }

    if (inputs.password === "") {
      setPasswordError(
        <MiniModalRight message="You must include a password." />
      );
    } else {
      setPasswordError();
    }

    let result = Object.values(inputs).some((o) => o === "");

    if (result) {
      console.log("There is an error");
    } else {
      axios
        .post("http://localhost:80/api/addUser.php", inputs)
        .then(function (response) {
          console.log(response);

          if (response.status === 200) {
            navigate("/");
          }
        });
    }
  };

  return (
    <>
      <h3>
        Welcome to first order medical, we look forward to working with you!
      </h3>
      <hr />
      <div>
        <Form className="reg-form">
          <Form.Group className="mb-2 name-reg" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            {nameError}
            <Form.Control
              name="name"
              type="text"
              placeholder="please enter your name"
              onChange={nameVal}
            />
          </Form.Group>
          <Form.Group className="mb-2 surname-reg">
            <Form.Label>Surname</Form.Label>
            {surnameError}
            <Form.Control
              name="surname"
              type="text"
              placeholder="Enter your surname"
              onChange={surnameVal}
            />
          </Form.Group>
          <Form.Group className="mb-2 age-reg">
            <Form.Label>Age</Form.Label>
            {ageError}
            <Form.Control
              name="age"
              type="text"
              placeholder="Please enter your age"
              onChange={ageVal}
            />
          </Form.Group>
          <Form.Group className="mb-2 gender-reg">
            <Form.Label>Gender</Form.Label>
            {genderError}
            <Form.Control
              name="gender"
              type="text"
              placeholder="Enter your gender"
              onChange={genderVal}
            />
          </Form.Group>
          <Form.Group className="mb-3 password-reg">
            <Form.Label>Phone number</Form.Label>
            {contactError}
            <Form.Control
              name="phone"
              type="number"
              placeholder="Phone number"
              onChange={phoneVal}
            />
          </Form.Group>
          <Form.Group className="mb-2 email-reg">
            <Form.Label>Email address</Form.Label>
            {emailAvail}
            {emailError}
            <Form.Control
              name="email"
              type="email"
              placeholder="Please enter email"
              onChange={emailVal}
              onBlur={authenticateEmail}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 password-reg"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            {passwordError}
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={passwordVal}
            />
          </Form.Group>

          <Form.Group className="mb-2 aid-reg">
            <Form.Label>Rank</Form.Label>
            {rankError}
            <Form.Control
              name="rank"
              type="email"
              placeholder="Rank"
              onChange={rankVal}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            id="submit-reg"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Form>
      </div>

      <img src={regImage} id="reg-img"></img>
    </>
  );
}

export default Register;
