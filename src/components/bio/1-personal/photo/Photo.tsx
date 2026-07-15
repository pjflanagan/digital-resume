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
  const [isRevealed, setIsRevealed] = useState(true);

  const className = clsx(Style.photoFrameHolder, {
    [Style.reveal]: isScrollRevealed && isRevealed,
  });

  /* eslint-disable react-hooks/set-state-in-effect -- intentional: re-triggers the reveal animation */
  useEffect(() => {
    // when the hover photo changes re-reveal
    setIsRevealed(false);
    setTimeout(() => {
      setIsRevealed(true);
    }, 10);
  }, [photo]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div className={Style.personalPhoto} ref={ref}>
      <Image
        src={contentImage('personal', photo)}
        alt={'Peter James Flanagan Headshot'}
        className={Style.image}
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
