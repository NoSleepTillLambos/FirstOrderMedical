import React from "react";

function PatientComp(props) {
  return (
    <div>
      <>
        {/* {modal} */}
        <div className="patientCard">
          <div className="editPatient"></div>
          <div className="deletePatient"></div>
          <div className="patientProfile">
            {/* <img src={renderPatientImage} className="patientImage" /> */}
          </div>
          <h4>
            {props.name} {props.surname}
          </h4>
          <p id="medicalAidNo">{props.medicalAidNo}</p>
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
            {props.cellNo}
          </p>
        </div>
      </>
    </div>
  );
}

export default PatientComp;
