import React, { useState, useRef } from "react";
import { useReveal } from 'src/hooks';
import * as Scroll from "react-scroll";

import { Wave } from "./wave";
import { Card } from "./card";
import * as Style from "./style.module.scss";

const ScrollComponent = Scroll.Element;

const SlideContact = () => {

  const [isWaveOn, setIsWaveOn] = useState(false);
  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 420 });

  return (
    <ScrollComponent className={Style.slideContact} name="contact">
      <div className={Style.slideFront}>
        <Card setIsWaveOn={setIsWaveOn} isOpen={isRevealed} />
      </div>
      <div className={Style.slideBack} ref={ref}>
        <Wave on={isWaveOn} />
      </div>
    </ScrollComponent>
  )
}

export { SlideContact };
