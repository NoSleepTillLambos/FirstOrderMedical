import React from "react";
import "../CSS/Patients.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patientPng from "../Assets/patients.png";
import { FaRegAddressCard } from "react-icons/fa";
import { Button } from "react-bootstrap";
import axios from "axios";
import doctor from "../Assets/doctor.png";
import PatientComp from "../Components/PatientComp";

function Patients() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState({
    activeUser: sessionStorage.getItem("activeUser"),
  });

  const [patients, setPatients] = useState();

  const [inputs, setInputs] = useState({
    image: "",
    name: "",
    surname: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    password: "",
    medicalAid: "",
  });

  const imageVal = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      console.log(reader.result);
      let imgFile = reader.result;

      setInputs({ ...inputs, image: imgFile });

      let image = new Image();
      image.src = reader.result;
      document.getElementById("profileImg").appendChild(image);
    };
    reader.readAsDataURL(file);
  };

  const nameVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, name: value });
  };

  const surnameVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, surname: value });
  };

  const ageVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, age: value });
  };

  const genderVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, gender: value });
  };

  const contactVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, contact: value });
  };

  const emailVal = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, email: value });
  };

  const passwordVal = (e) => {
    // get input
    const value = e.target.value;
    setInputs({ ...inputs, password: value });
  };

  const medicalAidVal = (e) => {
    // get input
    const value = e.target.value;
    setInputs({ ...inputs, medicalAidNo: value });
  };

  // ROUTING BACK TO THE LOGIN IF NO USER IS LOGGED IN
  useEffect(() => {
    const userSession = sessionStorage.getItem("activeUser");
    if (userSession === "" || userSession === null) {
      navigate("/Login");
    }
  }, []);

  const [renderPatients, setRenderPatients] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:80/api/readPatients.php", userId)
      .then((res) => {
        let data = res.data;
        let renderPatients = data.map((item) => (
          <PatientComp
            key={item.id}
            rerender={setRenderPatients}
            uniqueId={item.id}
            name={item.name}
            surname={item.surname}
            medicalAidNo={item.medicalAidNo}
            gender={item.gender}
            age={item.age}
            contact={item.contact}
          />
        ));
        console.log(res);
        setPatients(renderPatients);
        setRenderPatients(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [renderPatients]);

  const addPatient = () => {
    document.getElementById("patientName").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("medicalAid").value = "";

    axios
      .post("http://localhost:80/api/addPatients.php", inputs)
      .then((res) => {
        let data = res.data;
        console.log(data);
        setRenderPatients(true);
      });
  };

  return (
    <>
      <div>
        <div className="image">
          <img src={patientPng} id="patient-img"></img>
        </div>

        <div className="add-patients">
          <h4>Add a patient</h4>

          <hr id="hrTwo" />
          <div
            src={doctor}
            alt={doctor}
            id="profileImg"
            className="doctor-img"
          ></div>
          <form style={{ marginTop: "-2%" }}>
            <input
              name="imageUrl"
              id="imgInput"
              className="imgInput"
              type="file"
              onChange={imageVal}
            />
            <input
              type="text"
              id="patientName"
              placeholder="name"
              onChange={nameVal}
            ></input>
            <input
              type="text"
              id="surname"
              placeholder="surname"
              onChange={surnameVal}
            />
            <input type="number" id="age" placeholder="age" onChange={ageVal} />
            <input
              type="text"
              id="gender"
              placeholder="Gender"
              onChange={genderVal}
            />
            <input
              type="number"
              id="contact"
              placeholder="Phone number"
              onChange={contactVal}
            />
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={emailVal}
            />
            <input
              type="text"
              id="password"
              placeholder="Password"
              onChange={passwordVal}
            />
            <input
              type="text"
              id="medicalAid"
              placeholder="Medical Aid"
              onChange={medicalAidVal}
            />
          </form>
          <Button
            style={{
              margin: "auto",
              height: "50px",
              width: "200px",
              backgroundColor: "white",
              color: "#145567",
            }}
            onClick={addPatient}
          >
            Add Psychologist
          </Button>
        </div>
      </div>

      <div className="patients">
        <h4>Patients:</h4>
        <hr id="hrThree" />
        {patients}
      </div>
    </>
  );
}

export default Patients;
