import type { CSSProperties, ReactNode } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';

import { TextHeading } from 'src/elements';
import { useBio } from 'src/content';
import { useReveal } from 'src/hooks';

import * as Style from './Certifications.module.scss';

type CertNodeProps = {
  name: string;
  index: number;
};

function CertNode({ name, index }: CertNodeProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 20 });

  const style = isRevealed
    ? ({ '--delay': `${index * 50}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={clsx(Style.node, isRevealed && Style.reveal)}
      style={style}
    >
      <div className={Style.chip}>
        {/* Pins on Left */}
        <div className={Style.pinsLeft}>
          <div className={Style.pin} />
          <div className={Style.pin} />
          <div className={Style.pin} />
          <div className={Style.pin} />
        </div>

        {/* Chip Body */}
        <div className={Style.chipBody}>
          <span className={Style.certName}>{name}</span>
        </div>

        {/* Pins on Right */}
        <div className={Style.pinsRight}>
          <div className={Style.pin} />
          <div className={Style.pin} />
          <div className={Style.pin} />
          <div className={Style.pin} />
        </div>
      </div>
    </div>
  );
}

export function Certifications(): ReactNode {
  const { certifications } = useBio().experience.skills;

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <div className={Style.certificationsContainer}>
      <div className={Style.heading}>
        <TextHeading>Certifications</TextHeading>
      </div>
      <div className={Style.certsGrid}>
        {certifications.map((cert, i) => (
          <CertNode key={cert.name} name={cert.name} index={i} />
        ))}
      </div>
    </div>
  );
}
