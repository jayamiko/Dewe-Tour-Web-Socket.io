import React from "react";
import "./card.css";

function Card(props) {
  return (
    <div
      key={props.index}
      className="card-container rounded flex items-center px-5"
    >
      <div className="card-content">
        <img src={props.image} alt="card-home"></img>
        <h2 className="text-center">{props.title}</h2>
        <small className="text-center">{props.subtitle}</small>
      </div>
    </div>
  );
}

export default Card;
