import "../CSS/Home.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GiPsychicWaves } from "react-icons/gi";
import waves from "../Assets/svg.png";

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
      <div>
        <h2 style={{ marginLeft: "100px" }}>Welcome {receptionist}, </h2>
        <img></img>
        <h4 style={{ float: "left", marginLeft: "100px" }}>
          Here are the appointments for today
        </h4>

        <div className="home-element" style={{ backgroundColor: "#248bfb" }}>
          <h2 style={{ marginTop: " 20px" }}>
            Add appointment <GiPsychicWaves />
          </h2>
          <hr id="hrTwo" />

          {/* ADDING */}
          <form>
            <select></select>
            <select>Mr broom</select>
          </form>
        </div>
      </div>

      <div
        className="add-appointment"
        style={{
          marginTop: "30px",
          float: "right",
          width: "50%",
          marginRight: "40px",
          backgroundColor: "#248bfb",
          borderRadius: "20px",
          zIndex: 1,
          height: "40vh",
        }}
      >
        hello
      </div>
    </>
  );
}

export default Home;
