import React from "react";
// import ErrorAsset from "../assets/error.svg";
import "../CSS/Modal.css";

const MiniModalLeft = (props) => {
  return (
    <div className="alertMiniModal">
      <p>{props.message}</p>
      {/* <img src={ErrorAsset} /> */}
    </div>
  );
};

export default MiniModalLeft;
