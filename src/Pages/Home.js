import "../CSS/Home.css";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GiPsychicWaves } from "react-icons/gi";
import { Button } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import AppointmentsTable from "../Components/AppointmentsTable";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dataPatient, setDataPatient] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [receptionist, setReceptionist] = useState();
  const [renderImage, setRenderImage] = useState();
  const [receptionistName, setReceptionistName] = useState([]);

  const [userId, setUserId] = useState({
    activeUser: sessionStorage.getItem("activeUser"),
  });

  // adding new appointments
  const [appointments, setAppointments] = useState();

  const [renderAppointment, setRenderAppointment] = useState();
  const [nameError, setNameError] = useState();
  const [dateError, setDateError] = useState();
  const [timeError, setTimeError] = useState();
  const [docError, setDocError] = useState();
  const [roomError, setRoomError] = useState();

  let selectedDoctor = useRef();
  let selectedRoom = useRef();
  let selectedPatient = useRef();

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    date: "",
    appointmentCreated: "",
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

  useEffect(() => {
    axios
      .get("http://localhost:80/api/readDoctors.php", userId)
      .then((res) => {
        let docData = res.data;
        setData(docData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:80/api/readPatients.php", userId)
      .then((res) => {
        let PatientData = res.data;
        setDataPatient(PatientData);
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

  const setLogout = () => {
    sessionStorage.clear();
    navigate("/Login");
  };

  useEffect(() => {
    axios
      .post("http://localhost:80/api/readAppointments.php", userId)
      .then((res) => {
        let data = res.data;
        let renderAppointments = data.map((item) => (
          // Importing table component and populating via props
          <AppointmentsTable
            key={item.id}
            rerender={setRenderAppointment}
            uniqueId={item.id}
            patientName={item.patient}
            doctorName={item.doctor}
            appointmentCreated={item.created_at}
            room={item.room}
          />
        ));

        setAppointments(renderAppointments);
        setRenderAppointment(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [renderAppointment]);

  const nameVal = () => {
    const patientName = selectedPatient.current.value;
    setNewAppointment({ ...newAppointment, patientName: patientName });

    // validate if the field is empty.
    if (newAppointment.patientName !== "") {
      setNameError();
    }
  };

  const dateVal = (e) => {
    const value = e.target.value;
    setNewAppointment({ ...newAppointment, date: value });

    // validate if the field is empty.
    if (newAppointment.date !== "") {
      setDateError();
    }
  };

  const timeVal = (e) => {
    const value = e.target.value;
    setNewAppointment({ ...newAppointment, time: value });

    // validate if the field is empty.
    if (newAppointment.time !== "") {
      setTimeError();
    }
  };

  const docVal = () => {
    const doctorName = selectedDoctor.current.value;
    setNewAppointment({ ...newAppointment, doctorName: doctorName });

    // validate if the field is empty.
    if (newAppointment.doc !== "") {
      setDocError();
    }
  };

  const roomVal = () => {
    const room = selectedRoom.current.value;
    setNewAppointment({ ...newAppointment, room: room });

    // validate if the field is empty.
    if (newAppointment.room !== "") {
      setRoomError();
    }
  };

  const addAppointment = (e) => {
    e.preventDefault();
    document.getElementById("patientName").value = "Select Patient";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("doctor").value = "Select Doctor";
    document.getElementById("doctorsRoom").value = "Select Room";

    axios
      .post("http://localhost:80/api/addAppointment.php", newAppointment)
      .then((res) => {
        let data = res.data;
        setRenderAppointment(true);
      });
  };

  return (
    <>
      <div onClick={setLogout}>
        <button
          style={{
            marginTop: "-70px",
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
        <div>
          <h2 style={{ marginLeft: "100px" }}>Welcome {receptionist}, </h2>
          <img></img>
          <h4 style={{ float: "left", marginLeft: "100px" }}>
            Here are the appointments for today:
          </h4>
          {appointments}
        </div>

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
            <select name="name" id="patientName">
              <option>Select Patient</option>
              {dataPatient.map((item) => (
                <option key={item.id}>
                  {item.name} {item.surname}
                </option>
              ))}
            </select>
            <input name="date" type="date" id="date" />
            <input name="time" type="time" id="time" />
            <select name="doctor" id="doctor">
              <option>Select Doctor</option>
              {data.map((item) => (
                <option key={item.id}>{item.surname}</option>
              ))}
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
            onClick={addAppointment}
          >
            Add appointment <AiOutlineUserAdd />
          </Button>
        </div>
      </div>

      <div
        className="add-appointment"
        style={{
          marginTop: "-70px",
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
