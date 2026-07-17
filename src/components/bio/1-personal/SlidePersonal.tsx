import { useState } from 'react';
import * as Scroll from 'react-scroll';

import { useBio } from 'src/content';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';

import { CurveTop, CurveBottom } from './curves/Curves';
import { Photo } from './photo/Photo';
import { PersonalBody } from './body/PersonalBody';

import * as Style from './SlidePersonal.module.scss';

const ScrollComponent = Scroll.Element;

function SlidePersonal() {
  // the name link (titleText.links[0]) doubles as the default photo/focusArea, so it only
  // needs to be set in one place in the content JSON
  const [defaultLink] = useBio().personal.titleText.links;
  const [photo, setPhoto] = useState(defaultLink.image ?? '');
  const [photoDescription, setPhotoDescription] = useState<string | undefined>(undefined);
  const [focusArea, setFocusArea] = useState<FocusArea | undefined>(defaultLink.focusArea);

  return (
    <ScrollComponent className={Style.slidePersonal} name="personal">
      <CurveTop />
      <div className={Style.slidePersonalSideLeft}>
        <Photo photo={photo} photoDescription={photoDescription} focusArea={focusArea} />
      </div>
      <div className={Style.slidePersonalSideRight}>
        <PersonalBody
          photoLinkCallback={(newPhoto, newPhotoDescription, newFocusArea) => {
            setPhoto(newPhoto);
            setPhotoDescription(newPhotoDescription);
            setFocusArea(newFocusArea);
          }}
        />
      </div>
      <CurveBottom />
    </ScrollComponent>
  );
}

export { SlidePersonal };
