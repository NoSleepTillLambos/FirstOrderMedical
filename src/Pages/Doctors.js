import React from "react";
import "../CSS/Doctors.css";
import doctor from "../Assets/doctor.png";

function Doctors() {
  return (
    <>
      <div>
        <h3>
          Add Doctor<img src={doctor} alt={doctor} className="doctor-img"></img>
        </h3>
      </div>

      <div className="add-doctor">
        <form className="doctor-form">
          <input name="name" placeholder="Name & Surname" />
          <input name="age" placeholder="Age" />
          <input name="occupation" placeholder="specialization" />
          <button type="submit">Add User</button>
        </form>
      </div>
      <div class="data-container">
        <h3> Doctors</h3>
      </div>
    </>
  );
}

export default Doctors;
