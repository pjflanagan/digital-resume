import React, { useState } from "react";
import * as Scroll from 'react-scroll';

import {
  CurveTopTop,
  CurveTopBottom,
  CurveBottomTop,
  CurveBottomBottom,
} from "./curves";
import { Photo } from "./photo";
import { Body } from "./body";

import * as Style from "./style.module.scss";

const ScrollComponent = Scroll.Element;

const SlidePersonal = ({ data }) => {
  const [photo, setPhoto] = useState('personal-photo.jpg');

  return (
    <ScrollComponent className={Style.slidePersonal} name="personal">
      <CurveTopTop />
      <CurveTopBottom />
      <div className={Style.slidePersonalSideLeft}>
        <Photo photo={photo} data={data} />
      </div>
      <div className={Style.slidePersonalSideRight}>
        <Body photoLinkCallback={(newPhoto) => setPhoto(newPhoto)} />
      </div>
      <CurveBottomTop />
      <CurveBottomBottom />
    </ScrollComponent>
  );
}

export { SlidePersonal };
