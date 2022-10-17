import React from "react";
import "../CSS/Patients.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patientPng from "../Assets/patients.png";
import { FaRegAddressCard } from "react-icons/fa";
import { Button } from "react-bootstrap";
import axios from "axios";
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
    cellNo: "",
    email: "",
    password: "",
    medicalAidNo: "",
  });

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
            contact={item.cellNo}
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
  return (
    <>
      <div>
        <div className="image">
          <img src={patientPng} id="patient-img"></img>
        </div>

        <div className="add-patients">
          <h4>Add a patient</h4>
          <FaRegAddressCard />
          <hr id="hrTwo" />
          <form className="appointments-tbl">
            <input type="text" id="patientName" placeholder="name"></input>
            <input type="text" id="surname" placeholder="surname" />
            <input type="number" id="age" placeholder="age" />
            <select name="doctor" id="doctor">
              <option>Select Patient</option>
            </select>
            <select name="room" id="doctorsRoom">
              <option>Select Room</option>
            </select>
          </form>
          <Button
            style={{
              margin: "auto",
              height: "50px",
              width: "200px",
              backgroundColor: "white",
              color: "#145567",
            }}
          >
            Add Psychologist
          </Button>
        </div>
      </div>

      <div className="patients">
        <h4>Patients:</h4>
        <hr id="hrThree" />
      </div>
    </>
  );
}

export default Patients;
