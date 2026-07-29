import { useRef } from 'react';

import { Image, Glitch } from 'src/elements';
import { FocusFrame } from 'src/elements/focus-frame/FocusFrame';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';
import type { PhotoLocation } from 'src/elements/text/types';
import { contentImage } from 'src/content';

import { Micrographics } from './micrographics/Micrographics';
import * as Style from './Photo.module.scss';

type PhotoProps = {
  photo: string;
  photoDescription?: string;
  photoLocation?: PhotoLocation;
  focusArea?: FocusArea;
  microGraphic?: string;
};

function Photo({ photo, photoDescription, photoLocation, focusArea, microGraphic }: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);

  const image = (
    <Glitch glitchIndex={photo} className={Style.glitchWrapper}>
      <Image
        src={contentImage('personal', photo)}
        alt="Peter James Flanagan Headshot"
        className={Style.image}
      />
    </Glitch>
  );

  return (
    <div className={Style.personalPhoto} ref={ref}>
      {focusArea ? <FocusFrame area={focusArea}>{image}</FocusFrame> : image}
      <Micrographics
        microGraphic={microGraphic}
        photoDescription={photoDescription}
        photoLocation={photoLocation}
      />
    </div>
  );
}

export { Photo };
