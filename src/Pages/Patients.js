import React from "react";
import "../CSS/Patients.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import patientPng from "../Assets/patients.png";

function Patients() {
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
      <div>
        <div className="add-patient">
          <img src={patientPng} id="patient-img"></img>
        </div>

        <div className="listed-patients">
          <h4 style={{ margin: "auto", marginTop: "20px" }}>Add a patient</h4>
          <hr id="hrTwo" style={{ marginTop: "10px" }} />
        </div>
      </div>
    </>
  );
}

export default Patients;
