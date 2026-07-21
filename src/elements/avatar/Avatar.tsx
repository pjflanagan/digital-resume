import { useRef, type ReactNode } from 'react';
import clsx from 'clsx';

import { useReveal } from 'src/hooks';
import { Image } from '../image/Image';

import * as Style from './Avatar.module.scss';

type AvatarProps = {
  src: string;
  name: string;
  background: string;
};

function Avatar({ src, name, background }: AvatarProps): ReactNode {
  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 180 });
  const className = clsx(Style.avatarHolder, {
    [Style.reveal]: isRevealed,
  });

  return (
    <div className={className} ref={ref}>
      <div className={Style.avatarImageHolder} style={{ background: background }}>
        <Image src={src} alt={name} className={Style.avatarImage} />
      </div>
      <div className={Style.avatarBack} />
    </div>
  );
}

export { Avatar };
