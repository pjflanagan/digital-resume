import { useEffect, useState } from 'react';

import { useBio } from 'src/content';
import { ScrollElement } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';
import { Random } from 'src/helpers/random';

import { Curve } from './curves/Curves';
import { Photo } from './photo/Photo';
import { PersonalBody } from './body/PersonalBody';

import * as Style from './SlidePersonal.module.scss';

function SlidePersonal() {
  // the name link (titleText.links[0]) doubles as the default photo/focusArea, so it only
  // needs to be set in one place in the content JSON
  const { titleText, microGraphics } = useBio().personal;
  const [defaultLink] = titleText.links;
  const [photo, setPhoto] = useState(defaultLink.image ?? '');
  const [photoDescription, setPhotoDescription] = useState<string | undefined>(
    defaultLink.imageDescription,
  );
  const [focusArea, setFocusArea] = useState<FocusArea | undefined>(defaultLink.focusArea);
  // random on photo change, advances in order on click (see microGraphicCycleCallback below)
  const [microGraphicIndex, setMicroGraphicIndex] = useState(0);
  const microGraphic = microGraphics?.length
    ? microGraphics[microGraphicIndex % microGraphics.length]
    : undefined;

  useEffect(() => {
    if (!microGraphics?.length) return;
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: pick a new
       random micro-graphic right away whenever the photo changes */
    setMicroGraphicIndex(Random.int(0, microGraphics.length - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  return (
    <ScrollElement className={Style.slidePersonal} name="personal">
      <Curve position="top" />
      <div className={Style.slidePersonalSideLeft}>
        <Photo
          photo={photo}
          photoDescription={photoDescription}
          focusArea={focusArea}
          microGraphic={microGraphic}
        />
      </div>
      <div className={Style.slidePersonalSideRight}>
        <PersonalBody
          photoLinkCallback={(newPhoto, newPhotoDescription, newFocusArea) => {
            setPhoto(newPhoto);
            setPhotoDescription(newPhotoDescription);
            setFocusArea(newFocusArea);
          }}
          microGraphicCycleCallback={() => setMicroGraphicIndex((i) => i + 1)}
        />
      </div>
      <Curve position="bottom" />
    </ScrollElement>
  );
}

export { SlidePersonal };
