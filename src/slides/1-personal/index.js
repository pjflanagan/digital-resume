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

const SlidePersonal = ({ data, ref }) => {
  return (
    <div className={Style.slidePersonal} ref={ref}>
      <CurveTopTop />
      <CurveTopBottom />
      <div className={Style.slidePersonalSideLeft}>
        <Photo edge="top" gap={280} data={data} />
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