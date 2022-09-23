import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Login.css";
import MiniModalRight from "../Components/MiniModalRight";
import { Button } from "react-bootstrap";

function Login() {
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const emailVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, email: value });

    // validate if the field is empty.
    if (inputs.email !== "") {
      setEmailError(
        <MiniModalRight message="You must provide an email address." />
      );
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");

      return;
    }
    setPasswordType("password");
  };

  const passwordVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, password: value });

    // validate if the field is empty.
    if (inputs.password !== "") {
      setPasswordError();
    }

    if (inputs.email === "") {
      setEmailError(
        <MiniModalRight message="You must provide an email address." />
      );
    } else {
      setEmailError();
    }

    if (inputs.password === "") {
      setPasswordError(
        <MiniModalRight message="You must include a password." />
      );
    } else {
      setPasswordError();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:8888/mediclinicApi/userLogin.php", inputs)
      .then(function (res) {
        console.log(res);

        if (res.data === true) {
          sessionStorage.setItem("activeUser", inputs.email);
          navigate("/EditLanding");
        } else {
          console.log("Email and password not valid.");
        }
      });
  };

  return (
    <div className="login">
      <form>
        <div className="loginForm">
          <div className="loginLogo"></div>
          <h1>Welcome to First Order!</h1>
          <input
            name="email"
            type="text"
            className="email"
            placeholder="Email"
            onChange={emailVal}
          />
          <input
            name="password"
            type={passwordType}
            className="password"
            placeholder="Password"
            onChange={passwordVal}
          />
          <div className="passwordShow" onClick={togglePassword}>
            {passwordType === "password" ? <p>show</p> : <p>hide</p>}
          </div>
          <a href="/EditLanding" onClick={handleSubmit}>
            <Button id="btn-login">Login!</Button>
          </a>
          {/* <a href=""><p>Forgot Passowrd.</p></a> */}
          <a href="/Register">
            <p>Don't have an account? Sign up!</p>
          </a>
        </div>
        <div className="loginImg"></div>
      </form>
    </div>
  );
}

export default Login;
