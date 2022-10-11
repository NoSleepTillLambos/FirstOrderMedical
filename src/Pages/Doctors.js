import React from "react";
import "../CSS/Doctors.css";
import doctor from "../Assets/doctor.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const navigate = useNavigate();

  return (
    <>
      <h3 style={{ marginLeft: "230px" }}>
        Add Doctor<img src={doctor} alt={doctor} className="doctor-img"></img>
      </h3>

      <div className="add-doctor">
        <form className="appointments-tbl">
          <select name="name" id="patient-name">
            <option>Select Patient</option>
          </select>
          <input name="date" type="date" id="date" />
          <input name="time" type="time" id="time" />
          <select name="doctor" id="doctor">
            <option>Select Doctor</option>
          </select>
          <select name="room" id="doctorsRoom">
            <option>Select Room</option>
          </select>
        </form>
      </div>
      <div class="data-container">
        <h3 style={{ textAlign: "center", marginTop: "20px" }}> Doctors:</h3>
      </div>
    </>
  );
}

export default Doctors;
