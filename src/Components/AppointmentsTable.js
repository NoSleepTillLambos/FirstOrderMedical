import React from "react";

function AppointmentsTable(props) {
  return (
    <>
      <div className="row_item">
        <p>
          <strong>Patient: </strong>
          {props.patient}
        </p>
        <p>
          <strong>Doctor: </strong>Dr. {props.doctorName}
        </p>
        <p>
          <strong>Time: </strong>
          {props.time}
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
