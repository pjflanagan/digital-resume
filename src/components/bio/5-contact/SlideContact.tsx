import { useState, useRef } from 'react';
import { useReveal } from 'src/hooks';
import { ScrollElement } from 'src/elements';

import { Wave } from './wave/Wave';
import { Card } from './card/Card';
import * as Style from './SlideContact.module.scss';

// TODO: re-enable once the second wave color has been tuned
const SECOND_WAVE_ENABLED = false;

function SlideContact() {
  const [isWaveOn, setIsWaveOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 560 });

  return (
    <ScrollElement className={Style.slideContact} name="contact">
      <div className={Style.slideFront}>
        <Card setIsWaveOn={setIsWaveOn} />
      </div>
      <div className={Style.slideBack} ref={ref}>
        <Wave on={isWaveOn} revealed={isRevealed} />
        {SECOND_WAVE_ENABLED && (
          <Wave
            on={isWaveOn}
            revealed={isRevealed}
            color="#1fcfcc88"
            className={Style.waveCyan}
          />
        )}
      </div>
    </ScrollElement>
  );
}

export { SlideContact };
