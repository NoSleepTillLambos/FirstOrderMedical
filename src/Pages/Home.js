import "../CSS/Home.css";
import React from "react";

function Home() {
  return (
    <>
      <h1 className="home-title">Peace of mind</h1>
      <div className="home-element">
        <h2>
          {/* when user is logged in, name will pop up with a welcome message and give them full access to the site */}
          Welcome Mrs:....
        </h2>
      </div>

      <div className="doctors">
        <h4>Doctors on shift today</h4>
      </div>

      <div className="logged-receptionist">
        <h4>Appointments for the day</h4>
      </div>
    </>
  );
}

export default Home;
