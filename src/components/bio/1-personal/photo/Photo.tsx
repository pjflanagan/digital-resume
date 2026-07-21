import { useMemo, useRef } from 'react';

import { TextAccent, FramedImage } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';
import { contentImage } from 'src/content';
import { useFlashOnChange, useReveal } from 'src/hooks';

import { MicroGraphic } from './micro-graphic/MicroGraphic';
import * as Style from './Photo.module.scss';
import clsx from 'clsx';

type PhotoProps = {
  photo: string;
  photoDescription?: string;
  focusArea?: FocusArea;
};

// picked at random each time the photo changes
const MICRO_GRAPHICS = ['fifth-element', 'all-seeing-eye'];
// TODO: re-enable once the micro-graphic svgs are redone by hand
const MICRO_GRAPHICS_ENABLED = false;

function Photo({ photo, photoDescription, focusArea }: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isScrollRevealed = useReveal({ ref, gap: 380 });
  const isPulsing = useFlashOnChange([photo]);
  const microGraphic = useMemo(
    () => MICRO_GRAPHICS[Math.floor(Math.random() * MICRO_GRAPHICS.length)],
    [photo],
  );

  const frameClassName = clsx(Style.photoFrameHolder, {
    [Style.reveal]: isScrollRevealed,
    [Style.pulse]: isPulsing,
  });

  return (
    <div className={Style.personalPhoto} ref={ref}>
      <FramedImage
        src={contentImage('personal', photo)}
        alt={'Peter James Flanagan Headshot'}
        imageClassName={Style.image}
        frameClassName={frameClassName}
        focusArea={focusArea}
      />
      {photoDescription && (
        <TextAccent className={Style.photoDescription} mono animate>
          {photoDescription}
        </TextAccent>
      )}
      {MICRO_GRAPHICS_ENABLED && (
        <MicroGraphic
          className={Style.microGraphic}
          src={`/img/micro-graphics/${microGraphic}.svg`}
        />
      )}
    </div>
  );
}

export { Photo };
