import React from "react";

import Style from "./style.module.scss";

const getFrameTypeClassName = (type) => {
  switch (type) {
    case "top-left":
      return Style.topLeft;
    case "top-right":
      return Style.topRight;
    case "bottom-left":
      return Style.bottomLeft;
    case "bottom-right":
      return Style.bottomRight;
    default:
      return '';
  }
};

// Frame takes a type, and optional styles
const Frame = ({ type, style }) => {
  return (
    <div
      className={`${Style.frame} ${getFrameTypeClassName(type)}`}
      style={style}
    ></div>
  );
};

// FrameHolder takes optional children and styles
const FrameHolder = ({ children, style }) => {
  return (
    <div className={`frame-holder`} style={style}>
      <Frame type="top-left" />
      <Frame type="top-right" />
      <Frame type="bottom-left" />
      <Frame type="bottom-right" />
      {children}
    </div>
  );
};

export { Frame, FrameHolder };
