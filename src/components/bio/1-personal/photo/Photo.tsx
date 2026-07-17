import { useRef } from 'react';

import { TextAccent, FramedImage } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';
import { contentImage } from 'src/content';
import { useFlashOnChange, useReveal } from 'src/hooks';

import * as Style from './Photo.module.scss';
import clsx from 'clsx';

type PhotoProps = {
  photo: string;
  photoDescription?: string;
  focusArea?: FocusArea;
};

function Photo({ photo, photoDescription, focusArea }: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isScrollRevealed = useReveal({ ref, gap: 280 });
  const isPulsing = useFlashOnChange([photo]);

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
    </div>
  );
}

export { Photo };
