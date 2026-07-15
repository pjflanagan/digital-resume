import { useRef, useState, useEffect } from 'react';

import { FrameHolder, Image, TextAccent } from 'src/elements';
import { contentImage } from 'src/content';
import { useReveal } from 'src/hooks';

// TODO: import { BillCypher } from "./bill-cypher"; ?
import * as Style from './Photo.module.scss';
import clsx from 'clsx';

type PhotoProps = {
  photo: string;
  photoDescription?: string;
};

const Photo = ({ photo, photoDescription }: PhotoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isScrollRevealed = useReveal({ ref, gap: 280 });
  const hasMounted = useRef(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const className = clsx(Style.photoFrameHolder, {
    [Style.reveal]: isScrollRevealed,
    [Style.pulse]: isPulsing,
  });
  const imageClassName = clsx(Style.image);

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
      <Image
        src={contentImage('personal', photo)}
        alt={'Peter James Flanagan Headshot'}
        className={imageClassName}
      />
      <FrameHolder className={className}></FrameHolder>
      {photoDescription && (
        <TextAccent className={Style.photoDescription} mono animate>
          {photoDescription}
        </TextAccent>
      )}
    </div>
  );
};

export { Photo };
