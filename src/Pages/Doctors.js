import React from "react";
import "../CSS/Doctors.css";
import doctor from "../Assets/doctor.png";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import DoctorComp from "../Components/DoctorComp";
import axios from "axios";

function Doctors() {
  const styles = { backgroundColor: "white", height: "50px" };
  const navigate = useNavigate();

  const [modal, setModal] = useState();

  const [userId, setUserId] = useState({
    activeUser: sessionStorage.getItem("activeUser"),
  });

  // ROUTING BACK TO THE LOGIN IF NO USER IS LOGGED IN
  useEffect(() => {
    const userSession = sessionStorage.getItem("activeUser");
    if (userSession === "" || userSession === null) {
      navigate("/Login");
    }
  }, []);

  const [doctors, setDoctors] = useState();

  const [values, setValues] = useState({
    surname: "",
    email: "",
    contact: "",
    password: "",
    age: "",
    gender: "",
  });

  const nameVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, name: value });
  };

  const surnameVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, surname: value });
  };

  const ageVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, age: value });
  };

  const genderVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, gender: value });
  };

  const contactVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, contact: value });
  };

  const emailVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, email: value });
  };

  const passwordVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, password: value });
  };

  const [renderDoctors, setRenderDoctors] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:80/api/readDoctors.php", userId)
      .then((res) => {
        let data = res.data;
        let renderDoctors = data.map((item) => (
          <DoctorComp
            key={item.id}
            rerender={setRenderDoctors}
            uniqueId={item.id}
            name={item.name}
            surname={item.surname}
            age={item.age}
            gender={item.gender}
            contact={item.contact}
            email={item.email}
          />
        ));
        setDoctors(renderDoctors);
        setRenderDoctors(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [renderDoctors]);

  const addDoctor = () => {
    document.getElementById("surname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("password").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";

    axios.post("http://localhost:80/api/addDoctors.php", values).then((res) => {
      let data = res.data;
      console.log(data);
      setRenderDoctors(true);
    });
  };

  return (
    <>
      <div className="add-doctor">
        <h3 style={{ color: "white" }}>
          Add Psychologist
          <div
            src={doctor}
            alt={doctor}
            id="profileImg"
            className="doctor-img"
          ></div>
        </h3>
        <hr id="hrTwo" />
        <form style={{ marginLeft: "60px", marginTop: "50px" }}>
          <input
            type="text"
            id="surname"
            onChange={surnameVal}
            placeholder="surname"
          />
          <input type="number" id="age" placeholder="age" onChange={ageVal} />
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={emailVal}
          />
          <input
            type="text"
            id="gender"
            placeholder="Gender"
            onChange={genderVal}
          />
          <input
            type="text"
            id="contact"
            placeholder="contact"
            onChange={contactVal}
          />
          <input
            type="text"
            id="password"
            placeholder="Password"
            onChange={passwordVal}
          />
        </form>
        <Button
          style={{
            height: "50px",
            width: "37%",
            backgroundColor: "white",
            color: "#145567",
          }}
          onClick={addDoctor}
        >
          Add Psychologist <AiOutlineUserAdd />
        </Button>
      </div>
      <div className="data-container">
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Psychologists:
        </h3>
        {doctors}
      </div>
    </>
  );
}

export default Doctors;
