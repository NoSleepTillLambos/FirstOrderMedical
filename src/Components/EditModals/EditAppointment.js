import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { Button } from "react-bootstrap";

function EditAppointment(props) {
  const closeModal = () => {
    props.rerender();
  };

  const [data, setData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [dataPatient, setDataPatient] = useState([]);

  let selectedDoctor = useRef();
  let selectedRoom = useRef();
  let selectedPatient = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:80/api/readDoctors.php")
      .then((res) => {
        let docData = res.data;
        setData(docData);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:80/api/readRoom.php")
      .then((res) => {
        let data = res.data;
        setRoomData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:80/api/readPatients.php")
      .then((res) => {
        let PatientData = res.data;
        setDataPatient(PatientData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [updatedAppointment, setUpdatedAppointment] = useState({
    id: props.id,
    newPatient: props.originalPatientName,
    newDate: props.originalDate,
    newTime: props.originalTime,
    newDoctor: props.originalDoctorName,
    newRoom: props.originalRoom,
  });

  useEffect(() => {
    document.getElementById("patientName").innerHTML = props.originalName;
    document.getElementById("date").innerHTML = props.originalDoctorName;
    document.getElementById("doctor").innerHTML = props.originalRoom;
    document.getElementById("doctorsRoom").innerHTML = props.originalDate;
  }, []);

  const nameChangeVal = (e) => {
    let value = selectedPatient.current.value;
    setUpdatedAppointment({ ...updatedAppointment, newPatient: value });
  };

  const doctorChangeVal = () => {
    let newDoctor = selectedDoctor.current.value;
    setUpdatedAppointment({ ...updatedAppointment, newDoctor: newDoctor });
  };

  const timeChangeVal = (e) => {
    let value = e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, newTime: value });
  };

  const dateChangeVal = (e) => {
    let value = e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, newDate: value });
  };

  const roomChangeVal = () => {
    let newRoom = selectedRoom.current.value;
    setUpdatedAppointment({ ...updatedAppointment, newRoom: newRoom });
  };

  const updateAppointment = () => {
    axios
      .post("http://localhost:80/api/updateAppointment.php", updatedAppointment)
      .then((res) => {
        let data = res.data;
        console.log(data);
        props.upRender(true);
        props.rerender();
      });
  };

  return (
    <>
      {/* MODAL STYLING IN APP.CSS */}
      <div className="appointmentModal">
        <h4 style={{ marginTop: "5px" }}>Edit appointments</h4>
        <hr id="modalHr" />
        <AiOutlineCloseCircle
          id="closeModal"
          style={{
            float: "right",
            fontSize: "2.5rem",
            marginTop: "-35px",
            marginRight: "10px",
          }}
          onClick={closeModal}
        />
        <form
          className="editAppointments"
          style={{ marginLeft: "50px", marginTop: "30px" }}
        >
          <select
            name="name"
            id="patientName"
            ref={selectedPatient}
            onChange={nameChangeVal}
          >
            <option>Select Patient</option>
            {dataPatient.map((item) => (
              <option key={item.id}>
                {item.name} {item.surname}
              </option>
            ))}
          </select>
          <input type="date" id="date" placeholder="date"></input>
          <select
            name="doctor"
            id="doctor"
            ref={selectedDoctor}
            onChange={doctorChangeVal}
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
            onChange={roomChangeVal}
          >
            <option>Select Room</option>
            {roomData.map((item) => (
              <option key={item.id}>{item.room}</option>
            ))}
          </select>
        </form>
        <button style={{ color: "white", border: "none" }}>
          Update Appointment
          <GrUpdate fontSize={"1rem"} style={{ marginLeft: "20px" }} />
        </button>
      </div>
    </>
  );
}

export default EditAppointment;
