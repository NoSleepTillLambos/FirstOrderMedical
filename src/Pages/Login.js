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
        <MiniModalRight message="Please provide your password" />
      );
    } else {
      setPasswordError();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:80/api/userLogin.php", inputs)
      .then(function (res) {
        console.log(res);

        if (res.data === true) {
          sessionStorage.setItem("activeUser", inputs.email);
          navigate("/");
        } else {
          alert("Email and password not valid.");
        }
      });
  };

  return (
    <div className="login">
      <form>
        <div className="loginForm">
          <div className="loginLogo"></div>
          <h2>Welcome!</h2>
          <div className="inputs">
            <input
              name="email"
              type="text"
              className="email"
              placeholder="Email..."
              onChange={emailVal}
            />
            <input
              name="password"
              type={passwordType}
              className="password"
              placeholder="Password..."
              onChange={passwordVal}
            />
          </div>
          <p id="caps-lock-warn">Caps lock is on!</p>
          <div className="passwordShow" onClick={togglePassword}>
            {passwordType === "password" ? <p>show</p> : <p>hide</p>}
          </div>
          <a href="/">
            <Button onClick={handleSubmit} id="btn-login">
              Login
            </Button>
          </a>
          {/* <a href=""><p>Forgot Passowrd.</p></a> */}
          <a href="/Register">
            <p>Don't have an account? Sign up here</p>
          </a>
          <hr />
        </div>
        <div className="loginImg"></div>
      </form>
    </div>
  );
}

export default Login;
