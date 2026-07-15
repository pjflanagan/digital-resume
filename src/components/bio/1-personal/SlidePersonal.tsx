import { useState } from 'react';
import * as Scroll from 'react-scroll';

import { CurveTop, CurveBottom } from './curves/Curves';
import { Photo } from './photo/Photo';
import { PersonalBody } from './body/PersonalBody';

import * as Style from './SlidePersonal.module.scss';

const ScrollComponent = Scroll.Element;

const SlidePersonal = () => {
  const [photo, setPhoto] = useState('personal-photo.jpg');

  return (
    <ScrollComponent className={Style.slidePersonal} name="personal">
      <CurveTop />
      <div className={Style.slidePersonalSideLeft}>
        <Photo photo={photo} />
      </div>
      <div className={Style.slidePersonalSideRight}>
        <PersonalBody photoLinkCallback={(newPhoto) => setPhoto(newPhoto)} />
      </div>
      <CurveBottom />
    </ScrollComponent>
  );
};

export { SlidePersonal };
