import React from 'react'

import './style.scss';

const Frame = ({ type, style }) => {
  return (
    <div className={`frame ${type}`} style={style}></div>
  );
}

const FrameHolder = ({ children, style }) => {
  return (
    <div className={`frame-holder`} style={style}>
      <Frame type="top-left" />
      <Frame type="top-right" />
      <Frame type="bottom-left" />
      <Frame type="bottom-right" />
      { children }
    </div>
  )
}

export { Frame, FrameHolder };