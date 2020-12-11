import React from 'react'

import {
  CurveTopTop,
  CurveTopBottom,
  CurveBottomTop,
  CurveBottomBottom
} from './curves';
import { Photo } from './photo'

import './style.scss'

const SlidePersonal = () => {
  return (
    <div className="slide-personal">
      <CurveTopTop />
      <CurveTopBottom />
      <div className="slide-personal-side-left">
        <Photo />
      </div>
      <div className="slide-personal-side-right">
        <h1>Hi, I'm Peter</h1>
        <p>
          I'm a full-stack software engineer living in New York. I fell in love with web development
          at a young age and have been having playing with it ever since. I enjoy making useful, deliberatley 
          designed, and fun web tools.
        </p>
        <p>
          Outside of coding, I'm an avid <a target="_blank" rel="noreferrer" href="//instagram.com/roller.babe">rollerblader</a>,
          a novice <span className="photo-link">rock climber</span>, and an eager Mandarin student.
        </p>
      </div>
      <CurveBottomTop />
      <CurveBottomBottom />
    </div>
  );
}

export { SlidePersonal }