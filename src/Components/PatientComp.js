import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import "../CSS/Patients.css";

function PatientComp(props) {
  return (
    <div>
      <>
        {/* {modal} */}
        <div className="pCard">
          <AiFillEdit style={{ margin: "5%" }} />
          <AiFillDelete style={{ float: "right", margin: "5%" }} />
          <div className="patientProfile">
            {/* <img src={renderPatientImage} className="patientImage" /> */}
          </div>
          <h5>
            {props.name} {props.surname}
          </h5>
          <p id="medicalAidNo">{props.medical_aid}</p>
          <hr />
          <p>
            <strong>Gender: </strong>
            {props.gender}
          </p>
          <p>
            <strong>Age: </strong>
            {props.age}
          </p>
          <p>
            <strong>Cell No: </strong>
            {props.contact}
          </p>
        </div>
      </>
    </div>
  );
}

export default PatientComp;
