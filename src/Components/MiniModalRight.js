import React from "react";
import "../CSS/Modals.css";
// import ErrorAsset from "../assets/error.svg";
import { BiCommentError } from "react-icons/bi";

const MiniModalRight = (props) => {
  return (
    <div className="alertMiniModalRight">
      <BiCommentError style={{ float: "left", marginLeft: "40px" }} />
      <p>{props.message}</p>
    </div>
  );
};

export default MiniModalRight;
