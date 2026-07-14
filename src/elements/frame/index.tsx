import React from "react";

import * as Style from "./style.module.scss";

const getFrameTypeClassName = (type: string): string => (
  {
    'top-left': Style.topLeft,
    'top-right': Style.topRight,
    'bottom-left': Style.bottomLeft,
    'bottom-right': Style.bottomRight
  }[type] || Style[type]
);

type FrameProps = {
  type: string;
  style?: React.CSSProperties;
};

// Frame takes a type, and optional styles
const Frame = ({ type, style }: FrameProps) => {
  return (
    <div
      className={`${Style.frame} ${getFrameTypeClassName(type)}`}
      style={style}
    ></div>
  );
};

type FrameHolderProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

// FrameHolder takes optional children and styles
const FrameHolder = ({ children, style, className }: FrameHolderProps) => {
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
