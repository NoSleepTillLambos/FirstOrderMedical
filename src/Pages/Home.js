import "../CSS/Home.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GiPsychicWaves } from "react-icons/gi";
import { Button } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";
import * as BiIcons from "react-icons/bi";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [receptionist, setReceptionist] = useState();
  const [renderImage, setRenderImage] = useState();
  const [receptionistName, setReceptionistName] = useState([]);

  const [userId, setUserId] = useState({
    activeUser: sessionStorage.getItem("activeUser"),
  });

  // appointments
  const [appointments, setAppointments] = useState();

  const [nameError, setNameError] = useState();
  const [medicalAidError, setMedicalAidError] = useState();
  const [dateError, setDateError] = useState();
  const [timeError, setTimeError] = useState();
  const [docError, setDocError] = useState();
  const [roomError, setRoomError] = useState();

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    medicalAidNo: "",
    date: "",
    time: "",
    doctorName: "",
    room: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:80/api/readPsychologists.php", userId)
      .then((res) => {
        let psychData = res.data;
        setData(psychData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // use effect reads the active user and we will then display the user from there via .map
  useEffect(() => {
    const userSession = sessionStorage.getItem("activeUser");
    if (userSession === "" || userSession === null) {
      navigate("/Login");
    }

    axios
      .post("http://localhost:80/api/readReceptionists.php", userId)
      .then((res) => {
        let data = res.data;
        let source = data[0].image;
        let renderPath = "http://localhost:80/api/" + source;
        setRenderImage(renderPath);
        setReceptionist(data.map((item) => item.name));
        setReceptionistName(data.map((item) => item.name + " " + item.surname));
      });
  }, []);

  //------------------------ code for logging out users and reRendering to check session storage ------------------------ ////////////

  const setLogout = () => {
    sessionStorage.clear();
    navigate("/Login");
  };

  return (
    <>
      <div onClick={setLogout}>
        <button
          style={{
            marginTop: "-75px",
            float: "right",
            outline: "white",
            border: "none",
            color: " white",
            marginRight: "40px",
            width: " 100px",
            height: "50px",
            borderRadius: "5px",
            backgroundColor: " #145567",
          }}
        >
          Logout <BiIcons.BiLogOut />
        </button>
      </div>

      <div>
        <h2 style={{ marginLeft: "100px" }}>Welcome {receptionist}, </h2>
        <img></img>
        <h4 style={{ float: "left", marginLeft: "100px" }}>
          Here are the appointments for today:
        </h4>

        <div
          className="home-element"
          style={{ backgroundColor: "#145567", textAlign: "center" }}
        >
          <h2 style={{ marginTop: " 20px" }}>
            Add appointment <GiPsychicWaves />
          </h2>
          <hr id="hrTwo" />

          {/* ADDING */}
          <form className="appointments-tbl">
            <select name="name" id="patient-name">
              <option>Select Patient</option>
            </select>
            <input name="date" type="date" id="date" />
            <input name="time" type="time" id="time" />
            <select name="doctor" id="doctor">
              <option>Select Doctor</option>
            </select>
            <select name="room" id="doctorsRoom">
              <option>Select Room</option>
            </select>
          </form>
          <Button
            style={{
              margin: "auto",
              height: "50px",
              backgroundColor: "white",
              color: "#145567",
            }}
          >
            Add appointment <AiOutlineUserAdd />
          </Button>
        </div>
      </div>

      <div
        className="add-appointment"
        style={{
          marginTop: "23px",
          float: "right",
          width: "50%",
          marginRight: "40px",
          backgroundColor: "#145567",
          borderRadius: "10px",
          zIndex: 1,
          height: "40vh",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ marginTop: " 20px" }}>
          Receptionist on shift <MdOutlineWorkOutline />
        </h2>
        <hr id="hrTwo" />
      </div>
    </>
  );
}

export default Home;
