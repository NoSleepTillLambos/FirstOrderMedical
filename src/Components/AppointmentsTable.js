import React from "react";
import "../App.css";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

function AppointmentsTable(props) {
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
      console.log("The patient was not deleted.");
    }
  };
  return (
    <>
      {/* styling coming from app.css */}
      <div className="appointments-tbl">
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
        <AiFillDelete
          style={{ float: "right", marginTop: "-80px" }}
          onClick={deleteAppointment}
        />
        {/* <div className="delete" onClick={deleteAppointment}></div> */}
        {/* <div className="edit" onClick={editAppointment}></div> */}
      </div>
    </>
  );
}

export default AppointmentsTable;
