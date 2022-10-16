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
  const navigate = useNavigate();

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
    image: "",
    name: "",
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

  const cellVal = (e) => {
    const value = e.target.value;
    setValues({ ...values, cellNo: value });
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
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

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
          <img src={doctor} alt={doctor} className="doctor-img"></img>
        </h3>
        <hr id="hrTwo" />
        <form className="appointments-tbl">
          <input
            type="text"
            id="name patientName"
            placeholder="name"
            onChange={nameVal}
          ></input>
          <input
            type="text"
            id="surname"
            onChange={surnameVal}
            placeholder="surname"
          />
          <input type="number" id="age" placeholder="age" onChange={ageVal} />
          <select name="doctor" id="doctor">
            <option>Select Doctor</option>
          </select>
          <select name="room" id="doctorsRoom">
            <option>Select Room</option>
          </select>
        </form>
        <Button
          style={{
            alignItems: "center",
            height: "70px",
            backgroundColor: "white",
            color: "#145567",
          }}
          onClick={addDoctor}
        >
          Add Psychologist <AiOutlineUserAdd />
        </Button>
      </div>
      <div class="data-container">
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Psychologists:
        </h3>
        {doctors}
      </div>
    </>
  );
}

export default Doctors;
