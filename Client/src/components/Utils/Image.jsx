import React from "react";

function Image(props) {
  return <img src={props.src} className={props.styles} alt={props.alt} />;
}

export default Image;
