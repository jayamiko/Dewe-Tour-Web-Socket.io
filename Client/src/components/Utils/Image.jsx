import React from "react";

function Image(props) {
  return (
    <img
      key={props.key}
      src={props.src}
      width={props.width}
      height={props.height}
      className={props.styles}
      alt={props.alt}
    />
  );
}

export default Image;
