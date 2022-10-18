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
  const [receptionist, setReceptionist] = useState();
  // const [renderImage, setRenderImage] = useState();
  const [receptionistName, setReceptionistName] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const [userId, setUserId] = useState({
    activeUser: sessionStorage.getItem("activeUser"),
  });

  // ADDING NEW APPOINTMENTS
  const [appointments, setAppointments] = useState();

  const [renderAppointment, setRenderAppointment] = useState();
  const [nameError, setNameError] = useState();
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

  const setLogout = () => {
    sessionStorage.removeItem("activeUser");
    navigate("/Login");
  };

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
        let patientData = res.data;
        setDataPatient(patientData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:80/api/readRoom.php", userId)
      .then((res) => {
        let roomData = res.data;
        setRoomData(roomData);
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
        // setRenderImage(renderPath);
        setReceptionist(data.map((item) => item.name));
        setReceptionistName(data.map((item) => item.name + " " + item.surname));
      });
  }, []);

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

  const patientNameVal = () => {
    const patientName = selectedPatient.current.value;
    setNewAppointment({ ...newAppointment, patientName: patientName });

    // validate if the field is empty.
    if (newAppointment.patientName !== "") {
      setNameError();
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
    document.getElementById("doctor").value = "Select Doctor";
    document.getElementById("doctorsRoom").value = "Select Room";

    axios
      .post("http://localhost:80/api/addAppointment.php", newAppointment)
      .then((res) => {
        let data = res.data;
        console.log(data);
        setRenderAppointment(true);
      });
  };

  return (
    <>
      <div>
        <div>
          <img></img>
          <h4 style={{ float: "left", marginLeft: "40px" }}>
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
          <form
            className="addAppointments"
            style={{ marginLeft: "50px", marginTop: "30px" }}
          >
            <select
              name="name"
              id="patientName"
              ref={selectedPatient}
              onChange={patientNameVal}
            >
              <option>Select Patient</option>
              {dataPatient.map((item) => (
                <option key={item.id}>
                  {item.name} {item.surname}
                </option>
              ))}
            </select>

            <select
              name="doctor"
              id="doctor"
              ref={selectedDoctor}
              onChange={docVal}
            >
              <option>Select Doctor</option>
              {data.map((item) => (
                <option key={item.id}>{item.surname}</option>
              ))}
            </select>
            <select
              name="room"
              id="doctorsRoom"
              ref={selectedRoom}
              onChange={roomVal}
            >
              <option>Select Room</option>
              {roomData.map((item) => (
                <option key={item.id}>{item.room}</option>
              ))}
            </select>
          </form>
          <Button
            style={{
              margin: "auto",
              marginTop: "80px",
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
          marginTop: "-80px",
          float: "right",
          width: "50%",
          marginRight: "40px",
          backgroundColor: "#145567",
          borderRadius: "10px",
          zIndex: 1,
          height: "40vh",
          color: "white",
        }}
      >
        <h2 style={{ marginTop: " 20px", textAlign: "center" }}>
          Receptionist on shift <MdOutlineWorkOutline />
        </h2>

        <hr id="hrTwo" />
        <h2 style={{ margin: "30px" }}>Welcome {receptionist}! </h2>
        <p style={{ marginLeft: "30px" }}>
          You can find the appointments for today on the left
        </p>
        <button
          style={{
            float: "right",
            marginTop: "30px",
            outline: "white",
            border: "none",
            color: "#145567",
            marginRight: "20px",
            width: " 100px",
            height: "50px",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
          onClick={setLogout}
        >
          Logout <BiIcons.BiLogOut />
        </button>
      </div>
    </>
  );
}

export default Home;
