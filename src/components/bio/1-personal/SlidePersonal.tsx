import { useState } from 'react';

import { useBio } from 'src/content';
import { ScrollElement } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';

import { Curve } from './curves/Curves';
import { Photo } from './photo/Photo';
import { PersonalBody } from './body/PersonalBody';

import * as Style from './SlidePersonal.module.scss';

function SlidePersonal() {
  // the name link (titleText.links[0]) doubles as the default photo/focusArea, so it only
  // needs to be set in one place in the content JSON
  const [defaultLink] = useBio().personal.titleText.links;
  const [photo, setPhoto] = useState(defaultLink.image ?? '');
  const [photoDescription, setPhotoDescription] = useState<string | undefined>(
    defaultLink.imageDescription,
  );
  const [focusArea, setFocusArea] = useState<FocusArea | undefined>(defaultLink.focusArea);
  const { microGraphics } = useBio().personal;

  return (
    <ScrollElement className={Style.slidePersonal} name="personal">
      <Curve position="top" />
      <div className={Style.slidePersonalSideLeft}>
        <Photo
          photo={photo}
          photoDescription={photoDescription}
          focusArea={focusArea}
          microGraphics={microGraphics}
        />
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
      <Curve position="bottom" />
    </ScrollElement>
  );
}

export { SlidePersonal };
