import React, { useState } from "react";
import * as Scroll from "react-scroll";

import { Wave } from "./wave";
import { Card } from "./card";
import * as Style from "./style.module.scss";

const ScrollComponent = Scroll.Element;

const SlideContact = () => {

  const [isWaveOn, setIsWaveOn] = useState(false);
  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 132 });

  return (
    <ScrollComponent ref={ref} className={Style.slideContact} name="contact">
      <div className={Style.slideFront}>
        <Card setIsWaveOn={setIsWaveOn} />
      </div>
      <div className={Style.slideBack}>
        <Wave on={isWaveOn} open={isRevealed} />
      </div>
    </ScrollComponent>
  )
}

export { SlideContact };
