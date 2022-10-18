import React from "react";
import "../App.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

function AppointmentsTable(props) {
  return (
    <>
      {/* styling coming from app.css */}
      <div className="appointments-table">
        <p style={{ float: "left" }}>
          <strong>Patient: </strong>
          {props.patientName}
        </p>
        <p>
          <strong>Doctor: </strong>
          {props.doctorName}
        </p>
        <p>
          <strong>Time created: </strong>
          {props.appointmentCreated}
        </p>
        <p>
          <strong>Room: </strong>
          {props.room}
        </p>
        <AiFillEdit style={{ float: "right", marginTop: "-120px" }} />
        <AiFillDelete style={{ float: "right", marginTop: "-80px" }} />
        {/* <div className="delete" onClick={deleteAppointment}></div> */}
        {/* <div className="edit" onClick={editAppointment}></div> */}
      </div>
    </>
  );
}

export default AppointmentsTable;
