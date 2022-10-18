import React from "react";
import EditDoctor from "./EditDoctor";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function EditPatients(props) {
  const closeModal = () => {
    props.rerender();
  };

  return (
    <>
      <div className="editPatientModal">
        <AiOutlineCloseCircle
          id="closeModal"
          style={{
            float: "right",
            fontSize: "2.5rem",
            marginTop: "5px",
            marginRight: "10px",
          }}
          onClick={closeModal}
        />
        <h4>Edit Patients: </h4>
        <hr id="modalHr" />
      </div>
    </>
  );
}

export default EditPatients;
