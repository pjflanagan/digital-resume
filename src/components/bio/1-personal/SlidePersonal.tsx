import { useState } from 'react';
import * as Scroll from 'react-scroll';

import type { ImageQueryData } from 'src/content';

import { CurveTopTop, CurveTopBottom, CurveBottomTop, CurveBottomBottom } from './curves/Curves';
import { Photo } from './photo/Photo';
import { Body } from './body/Body';

import * as Style from './SlidePersonal.module.scss';

const ScrollComponent = Scroll.Element;

type SlidePersonalProps = {
  data: ImageQueryData;
};

const SlidePersonal = ({ data }: SlidePersonalProps) => {
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
};

export { SlidePersonal };
