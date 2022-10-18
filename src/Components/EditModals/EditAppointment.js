import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function EditAppointment() {
  const [data, setData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [dataPatient, setDataPatient] = useState([]);
  let selectedDoctor = useRef();
  let selectedRoom = useRef();
  let selectedPatient = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:80/api/readDoctors.php")
      .then((res) => {
        let docData = res.data;
        setData(docData);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:80/api/readRoom.php")
      .then((res) => {
        let data = res.data;
        setRoomData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:80/api/readPatients.php")
      .then((res) => {
        let PatientData = res.data;
        setDataPatient(PatientData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [updatedAppointment, setUpdatedAppointment] = useState({
    id: props.id,
    newPatient: props.origionalPatientName,
    newDate: props.origionalDate,
    newTime: props.origionalTime,
    newDoctor: props.origionalDoctorName,
    newRoom: props.origionalRoom,
  });

  const closeModal = () => {
    props.rerender();
  };

  useEffect(() => {
    document.getElementById("patientName").innerHTML =
      props.origionalPatientName;
    document.getElementById("time").innerHTML = props.origionalTime;
    document.getElementById("dr").innerHTML = props.origionalDoctorName;
    document.getElementById("drRoom").innerHTML = props.origionalRoom;
    document.getElementById("date").innerHTML = props.origionalDate;
  }, []);

  const nameChange = (e) => {
    let value = selectedPatient.current.value;
    setUpdatedAppointment({ ...updatedAppointment, newPatient: value });
  };

  const doctorChange = () => {
    let newDoctor = selectedDoctor.current.value;
    setUpdatedAppointment({ ...updatedAppointment, newDoctor: newDoctor });
  };

  const timeChange = (e) => {
    let value = e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, newTime: value });
  };

  const dateChange = (e) => {
    let value = e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, newDate: value });
  };

  const roomChange = () => {
    let newRoom = selectedRoom.current.value;
    setUpdatedAppointment({ ...updatedAppointment, newRoom: newRoom });
  };

  const updateAppointment = () => {
    axios
      .post("http://localhost:80/api/updateAppointment.php", updatedAppointment)
      .then((res) => {
        let data = res.data;
        console.log(data);
        props.upRender(true);
        props.rerender();
      });
  };

  return (
    <>
      <div>hello, this is the modal</div>
    </>
  );
}

export default EditAppointment;
