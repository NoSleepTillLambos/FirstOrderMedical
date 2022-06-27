import "../CSS/Home.css";
import React from "react";
import { FaBriefcaseMedical } from "react-icons/fa";

function Home() {
  return (
    <>
      <h1 className="home-title">Peace of mind</h1>
      <div className="home-element">
        <h2>
          {/* when user is logged in, name will pop up with a welcome message and give them full access to the site */}
          Appointments for today
        </h2>
      </div>

      <div className="doctors">
        <h4>
          Psychologists on shift today <FaBriefcaseMedical />
        </h4>
      </div>

      <div className="logged-receptionist">
        <h4>Appointments for the day</h4>
      </div>
    </>
  );
}

export default Home;
