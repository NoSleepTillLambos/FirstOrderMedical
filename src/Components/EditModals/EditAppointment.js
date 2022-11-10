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
    patient: props.originalName,
    doctor: props.originalDocName,
    room: props.originalRoom,
  });

  const nameChangeVal = (e) => {
    let value = selectedPatient.current.value;
    setUpdatedAppointment({ ...updatedAppointment, patient: value });
  };

  const doctorChangeVal = (e) => {
    let newDoctor = selectedDoctor.current.value;
    setUpdatedAppointment({ ...updatedAppointment, doctor: newDoctor });
  };
  const roomChangeVal = (e) => {
    let newRoom = selectedRoom.current.value;
    setUpdatedAppointment({ ...updatedAppointment, room: newRoom });
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
          style={{ marginLeft: "10%", marginTop: "30px" }}
        >
          <input
            name="name"
            id="patientName"
            placeholder="Patient"
            defaultValue={props.originalName}
            ref={selectedPatient}
            onChange={nameChangeVal}
          ></input>
          <input
            name="doctor"
            placeholder="Doctor"
            id="doctor"
            defaultValue={props.originalDocName}
            ref={selectedDoctor}
            onChange={doctorChangeVal}
          ></input>
          <input
            name="room"
            id="doctorsRoom"
            placeholder="Room"
            defaultValue={props.originalRoom}
            ref={selectedRoom}
            onChange={roomChangeVal}
          ></input>
        </form>
        <button
          style={{ color: "black", border: "none" }}
          onClick={updateAppointment}
        >
          Update Appointment
          <GrUpdate fontSize={"1rem"} style={{ marginLeft: "20px" }} />
        </button>
      </div>
    </>
  );
}

export default EditAppointment;
