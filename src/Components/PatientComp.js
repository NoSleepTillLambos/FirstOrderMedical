import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import "../CSS/Patients.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientComp(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem("activeUser");
    if (userSession === "" || userSession === null) {
      navigate("/");
    }

    // let patientId = {id: props.uniqueId};
    // axios.post('http://localhost:80/api/readPatientProfile.php', patientId)
    // .then((res)=>{
    //     let data = res.data;
    //     let source = data[0].image;
    //     let renderPath = 'http://localhost:80/api/' + source;
    //     setRenderPatientImage(renderPath);
    //     console.log(renderPath);
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
  }, []);

  const deletePatient = () => {
    if (
      window.confirm("Are you sure you want to remove this Patient?") === true
    ) {
      let patientId = { id: props.uniqueId };

      axios
        .post("http://localhost:80/api/deletePatient.php", patientId)
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
    <div>
      <>
        {/* {modal} */}
        <div className="pCard">
          <AiFillEdit style={{ margin: "5%" }} />
          <AiFillDelete
            id="deleteP"
            style={{ float: "right", margin: "5%" }}
            onClick={deletePatient}
          />
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
