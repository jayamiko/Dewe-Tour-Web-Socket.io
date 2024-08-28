import React from "react";

function Button(props) {
  return (
    <button
      style={{ backgroundColor: props.bgColor, color: props.color }}
      onClick={props.onClick}
      className={`btn font-bold ${props.styles}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
