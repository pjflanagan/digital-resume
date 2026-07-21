import { useRef, type ReactNode } from 'react';
import clsx from 'clsx';

import { useReveal } from 'src/hooks';

import * as Style from './Ruler.module.scss';

type RulerProps = {
  className?: string;
};

function Ruler({ className: classNameProp }: RulerProps): ReactNode {
  const holderRef = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref: holderRef, gap: 160 });

  return (
    <div ref={holderRef} className={Style.rulerHolder}>
      <div className={clsx(Style.ruler, classNameProp)}>
        {/* scale lives on its own wrapper so consumer transforms on .ruler don't override it */}
        <div className={clsx(Style.scale, isRevealed && Style.revealed)}>
          {[...Array(10)].map((e, i) => (
            <div className={Style.cm} key={i}>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
              <div className={Style.mm}></div>
            </div>
          ))}
          <div className={Style.cm}></div>
        </div>
      </div>
    </div>
  );
}

export { Ruler };
