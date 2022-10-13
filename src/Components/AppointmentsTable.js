import React from "react";
import "../App.css";
function AppointmentsTable(props) {
  return (
    <>
      {/* styling coming from app.css */}
      <div className="appointments-table">
        <p style={{ float: "left" }}>
          <strong>Patient: </strong>
          {props.patient}
        </p>
        <p style={{ float: "left" }}>
          <strong>Doctor: </strong>Dr. {props.doctorName}
        </p>
        <p>
          <strong>Time: </strong>
          {props.time}
        </p>
        <p style={{ float: "right" }}>
          <strong>Room: </strong>
          {props.room}
        </p>
        {/* <div className="delete" onClick={deleteAppointment}></div> */}
        {/* <div className="edit" onClick={editAppointment}></div> */}
      </div>
    </>
  );
}

export default AppointmentsTable;
