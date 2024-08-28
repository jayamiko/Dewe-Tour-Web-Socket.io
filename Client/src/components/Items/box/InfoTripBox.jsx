import React from "react";
import "./InfoTripBox.css";

function InfoTripBox(props) {
  return (
    <div className="px-2">
      <p className="title-info">{props.title}</p>
      <div className="flex">
        <img src={props.image} alt="" />
        <p className="text-black px-2 font-bold">{props?.description}</p>
      </div>
    </div>
  );
}

export default InfoTripBox;
