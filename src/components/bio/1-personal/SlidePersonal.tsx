import { useState } from 'react';
import * as Scroll from 'react-scroll';

import { useBio } from 'src/content';

import { CurveTop, CurveBottom } from './curves/Curves';
import { Photo } from './photo/Photo';
import { PersonalBody } from './body/PersonalBody';

import * as Style from './SlidePersonal.module.scss';

const ScrollComponent = Scroll.Element;

const SlidePersonal = () => {
  const { defaultImage } = useBio().personal;
  const [photo, setPhoto] = useState(defaultImage);
  const [photoDescription, setPhotoDescription] = useState<string | undefined>(undefined);

  return (
    <ScrollComponent className={Style.slidePersonal} name="personal">
      <CurveTop />
      <div className={Style.slidePersonalSideLeft}>
        <Photo photo={photo} photoDescription={photoDescription} />
      </div>
      <div className={Style.slidePersonalSideRight}>
        <PersonalBody
          photoLinkCallback={(newPhoto, newPhotoDescription) => {
            setPhoto(newPhoto);
            setPhotoDescription(newPhotoDescription);
          }}
        />
      </div>
      <CurveBottom />
    </ScrollComponent>
  );
};

export { SlidePersonal };
