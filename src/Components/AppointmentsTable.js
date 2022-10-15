import React from "react";
import "../App.css";

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
          <strong>Doctor: </strong>Dr. {props.doctorName}
        </p>
        <p>
          <strong>Time created: </strong>
          {props.appointmentCreated}
        </p>
        <p>
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
