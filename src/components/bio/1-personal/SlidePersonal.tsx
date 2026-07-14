import { useState } from 'react';
import * as Scroll from 'react-scroll';

import { CurveTopTop, CurveTopBottom, CurveBottomTop, CurveBottomBottom } from './curves/Curves';
import { Photo } from './photo/Photo';
import { PersonalBody } from './body/PersonalBody';

import * as Style from './SlidePersonal.module.scss';

const ScrollComponent = Scroll.Element;

const SlidePersonal = () => {
  const [photo, setPhoto] = useState('personal-photo.jpg');

  return (
    <ScrollComponent className={Style.slidePersonal} name="personal">
      <CurveTopTop />
      <CurveTopBottom />
      <div className={Style.slidePersonalSideLeft}>
        <Photo photo={photo} />
      </div>
      <div className={Style.slidePersonalSideRight}>
        <PersonalBody photoLinkCallback={(newPhoto) => setPhoto(newPhoto)} />
      </div>
      <CurveBottomTop />
      <CurveBottomBottom />
    </ScrollComponent>
  );
};

export { SlidePersonal };
