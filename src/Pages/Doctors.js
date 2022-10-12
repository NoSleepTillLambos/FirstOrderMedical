import React from "react";
import "../CSS/Doctors.css";
import doctor from "../Assets/doctor.png";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

function Doctors() {
  const navigate = useNavigate();

  // ROUTING BACK TO THE LOGIN IF NO USER IS LOGGED IN
  useEffect(() => {
    const userSession = sessionStorage.getItem("activeUser");
    if (userSession === "" || userSession === null) {
      navigate("/Login");
    }
  }, []);
  return (
    <>
      <h3 style={{ marginLeft: "200px" }}>
        Add Psychologist
        <img src={doctor} alt={doctor} className="doctor-img"></img>
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
        <Button
          style={{
            alignItems: "center",
            height: "50px",
            backgroundColor: "white",
            color: "#145567",
          }}
        >
          Add Psychologist <AiOutlineUserAdd />
        </Button>
      </div>
      <div class="data-container">
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Psychologists:
        </h3>
      </div>
    </>
  );
}

export default Doctors;
