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
    document.getElementById("patientName").value = "Patient Name";
    document.getElementById("doctor").value = "Doctor Name";
    document.getElementById("doctorsRoom").value = "";

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
        <div className="appointmentsTbl">
          <img></img>
          <h4>Here are the appointments for today:</h4>
          {appointments}
        </div>

        <div className="home-element">
          <h2 style={{ marginTop: " 20px" }}>
            Add appointment <GiPsychicWaves />
          </h2>
          <hr id="hrTwo" />

          {/* ADDING */}
          <form className="addAppointments">
            <select
              name="name"
              id="patientName"
              ref={selectedPatient}
              placeholder="Patient name"
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
              ref={selectedDoctor}
              id="doctor"
              placeholder="Select Doctor"
              onChange={docVal}
            >
              <option>Select Doctor</option>
              {data.map((item) => (
                <option key={item.id}>{item.surname}</option>
              ))}
              {docError}
            </select>
            <input
              name="room"
              id="doctorsRoom"
              ref={selectedRoom}
              onChange={roomVal}
              placeholder="Room number"
            ></input>
          </form>
          <Button id="addAppointment" onClick={addAppointment}>
            Add appointment <AiOutlineUserAdd />
          </Button>
        </div>
      </div>

      <div className="add-appointment">
        <h2 style={{ marginTop: " 20px", textAlign: "center" }}>
          Receptionist on shift <MdOutlineWorkOutline />
        </h2>

        <hr id="hrTwo" />
        <h2 style={{ margin: "30px" }}>Welcome {receptionist}! </h2>
        <p style={{ marginLeft: "30px" }}>
          You can find the appointments for today on the left
        </p>
        <button id="logout" onClick={setLogout}>
          Logout <BiIcons.BiLogOut />
        </button>
      </div>
    </>
  );
}

export default Home;
