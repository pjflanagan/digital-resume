import React, { useState } from "react";

import { Wave } from "./wave";
import { Card } from "./card";
import Style from "./style.module.scss";

const SlideContact = () => {

  const [isWaveOn, setIsWaveOn] = useState(false);

  return (
    <div className={Style.slideContact}>
      <div className={Style.slideFront}>
        <Card setIsWaveOn={setIsWaveOn} />
      </div>
      <div className={Style.slideBack}>
        <Wave on={isWaveOn} />
      </div>
    </div>
  )
}

export { SlideContact };
