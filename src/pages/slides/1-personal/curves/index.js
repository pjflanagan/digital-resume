import React from 'react'

import './style.scss';

const CurveTopTop = () => (
  <svg className="top-curve" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="
      M 0 0
      C 20 10, 80 10, 100 0
      L 100 10
      L 0 10
      L 0 0
      "
    />
  </svg>
);

const CurveTopBottom = () => (
  <svg className="top-curve-bottom" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="
      M 0 0
      C 20 10, 80 10, 100 0
      L 100 0
      L 0 0
      "
    />
  </svg>
);

const CurveBottomTop = () => (
  <svg className="bottom-curve-top" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="
      M 0 10
      C 20 0, 80 0, 100 10
      L 100 10
      L 0 10
      "
    />
  </svg>
)

const CurveBottomBottom = () => (
  <svg className="bottom-curve" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="
      M 0 10
      C 20 0, 80 0, 100 10
      L 100 0
      L 0 0
      L 0 10
      "
    />
  </svg>
);

export {
  CurveTopTop,
  CurveTopBottom,
  CurveBottomTop,
  CurveBottomBottom
};