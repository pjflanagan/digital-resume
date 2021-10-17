import React from "react";

import Style from "./style.module.scss";

const getFrameTypeClassName = (type) => (
  {
    'top-left': Style.topLeft,
    'top-right': Style.topRight,
    'bottom-left': Style.bottomLeft,
    'bottom-right': Style.bottomRight
  }[type] || Style[type]
);

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
const FrameHolder = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      <Frame type="top-left" />
      <Frame type="top-right" />
      <Frame type="bottom-left" />
      <Frame type="bottom-right" />
      {children}
    </div>
  );
};

export { Frame, FrameHolder };
