import React, { useState } from "react";

import {
  CurveTopTop,
  CurveTopBottom,
  CurveBottomTop,
  CurveBottomBottom,
} from "./curves";
import { Photo } from "./photo";
import { Body } from "./body";

import * as Style from "./style.module.scss";

const SlidePersonal = ({ data }) => {
  const [photo, setPhoto] = useState('personal-photo.jpg');

  return (
    <div className={Style.slidePersonal}>
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
    </div>
  );
}

export { SlidePersonal };
