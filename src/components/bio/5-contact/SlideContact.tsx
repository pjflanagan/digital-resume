import { useState, useRef } from 'react';
import { useReveal } from 'src/hooks';
import { ScrollElement } from 'src/elements';

import { Wave } from './wave/Wave';
import { Card } from './card/Card';
import * as Style from './SlideContact.module.scss';

function SlideContact() {
  const [isWaveOn, setIsWaveOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 420 });

  return (
    <ScrollElement className={Style.slideContact} name="contact">
      <div className={Style.slideFront}>
        <Card setIsWaveOn={setIsWaveOn} />
      </div>
      <div className={Style.slideBack} ref={ref}>
        <Wave on={isWaveOn} revealed={isRevealed} />
        <Wave
          on={isWaveOn}
          revealed={isRevealed}
          color="#1fcfcc55"
          className={Style.waveCyan}
          phaseOffset={Math.PI}
        />
      </div>
    </ScrollElement>
  );
}

export { SlideContact };
