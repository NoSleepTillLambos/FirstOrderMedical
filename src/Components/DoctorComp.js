import React, { useEffect, useState } from "react";
import axios from "axios";
// import EditDoctor from "./EditDoctor";
import { useNavigate } from "react-router-dom";
import "../CSS/Doctors.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const DoctorComponent = (props) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState();
  const [renderImage, setRenderImage] = useState();

  useEffect(() => {
    const userSession = sessionStorage.getItem("activeUser");
    if (userSession === "" || userSession === null) {
      navigate("/");
    }

    // let doctorId = { id: props.uniqueId };
    // axios
    //   .post("http://localhost:80/api/readDoctorProfile.php", doctorId)
    //   .then((res) => {
    //     let data = res.data;
    //     let source = data[0].image;
    //     let renderPath = "http://localhost:80/api/" + source;
    //     setRenderImage(renderPath);
    //     console.log(renderPath);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  //   const editDoctor = () => {
  //     setModal(
  //       <EditDoctor
  //         id={props.uniqueId}
  //         upRender={props.rerender}
  //         rerender={setModal}
  //         origionalName={props.name}
  //         origionalSurname={props.surname}
  //         origionalAge={props.age}
  //         origionalGender={props.gender}
  //         origionalCell={props.cellNo}
  //         origionalEmail={props.email}
  //         origionalSpecialization={props.specialization}
  //       />
  //     );
  //   };

  const deleteDoctor = () => {
    if (
      window.confirm("Are you sure you want to remove this Doctor?") === true
    ) {
      let doctorId = { id: props.uniqueId };

      axios
        .post("http://localhost:89/api/deleteDoctor.php", doctorId)
        .then((res) => {
          let data = res.data;
          props.rerender(true);
        });
    } else {
      console.log("The doctor was not deleted.");
    }
  };

  return (
    <>
      {/* {modal} */}
      <div className="drCard">
        <AiFillEdit style={{ margin: "8px" }} />
        <AiFillDelete
          onClick={deleteDoctor}
          style={{ float: "right", margin: "8px" }}
        />
        <div className="doctorProfile">
          <img src={renderImage} className="doctorImage" />
        </div>
        <h5>Dr. {props.surname}</h5>
        <hr style={{ width: "70%", margin: "auto", marginBottom: "5px" }} />
        <p>
          Gender:
          {props.gender}
        </p>
        <p>
          Age:
          {props.age}
        </p>
        <p>
          Cell:
          {props.contact}
        </p>
      </div>
    </>
  );
};

export default DoctorComponent;
