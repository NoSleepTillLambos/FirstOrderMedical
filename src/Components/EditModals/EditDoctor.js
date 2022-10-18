import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function EditDoctor(props) {
  const closeModal = () => {
    props.rerender();
  };
  return (
    <>
      <div className="editDoctorModal">
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
        <h4 style={{ textAlign: "center", marginTop: "10px" }}>Edit doctor</h4>
        <hr id="modalHr" />
      </div>
    </>
  );
}

export default EditDoctor;
