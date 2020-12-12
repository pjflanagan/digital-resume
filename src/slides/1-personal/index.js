import React from 'react'

import {
  CurveTopTop,
  CurveTopBottom,
  CurveBottomTop,
  CurveBottomBottom
} from './curves';
import { Photo } from './photo';
import { Body } from './body';

import Style from './style.module.scss';

const SlidePersonal = () => {
  return (
    <div className={Style.slidePersonal}>
      <CurveTopTop />
      <CurveTopBottom />
      <div className={Style.slidePersonalSideLeft}>
        <Photo edge="top" gap={120} />
      </div>
      <div className={Style.slidePersonalSideRight}>
        <Body />
      </div>
      <CurveBottomTop />
      <CurveBottomBottom />
    </div>
  );
}

export { SlidePersonal }