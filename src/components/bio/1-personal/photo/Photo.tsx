import { useRef, useState, useEffect } from 'react';

import { FrameHolder, Image } from 'src/elements';
import { useReveal } from 'src/hooks';

// TODO: import { BillCypher } from "./bill-cypher"; ?
import * as Style from './Photo.module.scss';
import clsx from 'clsx';

const IMG_ROOT = '/img/bio/1-personal';

type PhotoProps = {
  photo: string;
};

const Photo = ({ photo }: PhotoProps) => {
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
        src={`${IMG_ROOT}/${photo}`}
        alt={'Peter James Flanagan Headshot'}
        className={Style.image}
      />
      <FrameHolder className={className} />
    </div>
  );
};

export { Photo };
