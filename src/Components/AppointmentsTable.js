import React, { useState } from "react";
import "../App.css";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import EditAppointment from "./EditModals/EditAppointment";
import { AiFillDelete } from "react-icons/ai";

function AppointmentsTable(props) {
  const [modal, setModal] = useState();

  const deleteAppointment = () => {
    if (
      window.confirm("Are you sure you want to remove this Patient?") === true
    ) {
      let patientId = { id: props.uniqueId };

      axios
        .post("http://localhost:80/api/deleteAppointment.php", patientId)
        .then((res) => {
          let data = res.data;
          console.log(res);
          props.rerender(true);
        });
    } else {
      console.log("not deleted");
    }
  };

  const editAppointment = () => {
    setModal(
      <EditAppointment
        upRender={props.rerender}
        id={props.uniqueId}
        rerender={setModal}
        originalName={props.patient}
        originalSurname={props.date}
        originalDate={props.appointmentCreated}
        originalDoctorName={props.doctorName}
        originalRoom={props.room}
      />
    );
  };
  return (
    <>
      {modal}
      {/* styling coming from app.css */}
      <div className="appointments-tbl">
        <p style={{ float: "left" }}>
          <strong>Patient: </strong>
          {props.patient}
        </p>
        <p>
          <strong>Doctor: </strong>
          {props.doctor}
        </p>
        <p>
          <strong>Time created: </strong>
          {props.appointmentCreated}
        </p>
        <p>
          <strong>Room: </strong>
          {props.room}
        </p>
        <AiFillEdit
          style={{ float: "right", marginTop: "-120px" }}
          onClick={editAppointment}
        />
        <AiFillDelete
          style={{ float: "right", marginTop: "-80px" }}
          onClick={deleteAppointment}
        />
      </div>
    </>
  );
}

export default AppointmentsTable;
