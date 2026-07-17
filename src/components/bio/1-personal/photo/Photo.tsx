import { useRef, useState, useEffect } from 'react';

import { TextAccent, FramedImage } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';
import { contentImage } from 'src/content';
import { useReveal } from 'src/hooks';

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
  const hasMounted = useRef(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const frameClassName = clsx(Style.photoFrameHolder, {
    [Style.reveal]: isScrollRevealed,
    [Style.pulse]: isPulsing,
  });

  useEffect(() => {
    // skip the pulse on the very first render, only replay it when the photo actually changes
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setIsPulsing(true);
    const timeout = setTimeout(() => {
      setIsPulsing(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [photo]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
