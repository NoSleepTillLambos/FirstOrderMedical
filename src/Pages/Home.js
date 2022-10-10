import "../CSS/Home.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBriefcaseMedical } from "react-icons/fa";
import icon from "../Assets/ProjectLogo1.png";

function Home() {
  const navigate = useNavigate();

  const [receptionist, setReceptionist] = useState();
  const [renderImage, setRenderImage] = useState();
  const [receptionistName, setReceptionistName] = useState([]);

  const [userId, setUserId] = useState({
    activeUser: sessionStorage.getItem("activeUser"),
  });

  // use effect reads the active user and we will then display the user from there via .map
  useEffect(() => {
    const userSession = sessionStorage.getItem("activeUser");
    if (userSession === "" || userSession === null) {
      navigate("/");
    }

    axios
      .post("http://localhost:80/api/readReceptionists.php", userId)
      .then((res) => {
        let data = res.data;
        let source = data[0].image;
        let renderPath = "http://localhost:80/api/" + source;
        setRenderImage(renderPath);
        setReceptionist(data.map((item) => item.name));
        setReceptionistName(data.map((item) => item.name + " " + item.surname));
      });
  }, []);

  return (
    <>
      <h2 style={{ marginBottom: 20 }}>Welcome, {receptionist}</h2>
      <h4 style={{ marginBottom: 20 }}>
        Featured below are your appointments for the day
      </h4>

      <div className="home-element">
        <h2>
          {/* when user is logged in, name will pop up with a welcome message and give them full access to the site */}
          Appointments for today
        </h2>
      </div>

      <div className="psych">
        <h4>
          Psychologists on shift today <FaBriefcaseMedical />
        </h4>
      </div>

      <div className="logged-receptionist">
        <h4></h4>
      </div>
    </>
  );
}

export default Home;
