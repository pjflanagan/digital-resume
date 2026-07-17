import { useState, useRef } from 'react';
import { useReveal } from 'src/hooks';
import * as Scroll from 'react-scroll';

import { Wave } from './wave/Wave';
import { Card } from './card/Card';
import * as Style from './SlideContact.module.scss';

const ScrollComponent = Scroll.Element;

function SlideContact() {
  const [isWaveOn, setIsWaveOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 420 });

  return (
    <ScrollComponent className={Style.slideContact} name="contact">
      <div className={Style.slideFront}>
        <Card setIsWaveOn={setIsWaveOn} isOpen={isRevealed} />
      </div>
      <div className={Style.slideBack} ref={ref}>
        <Wave on={isWaveOn} revealed={isRevealed} />
      </div>
    </ScrollComponent>
  );
}

export { SlideContact };
