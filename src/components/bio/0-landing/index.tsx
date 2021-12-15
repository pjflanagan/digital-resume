import React, { FC } from "react";

import { Canvas } from "elements";
import { useScroll } from "hooks";

import { View } from "./view";
import { Body } from "./body";
import * as Style from "./style.module.scss";

// SlideLanding

const SlideLanding: FC = () => {
  const canvasScroll = useScroll() / 2;
  return (
    <div className={Style.splash}>
      <Body />
      <Canvas
        className={Style.canvas}
        view={View}
        style={{
          transform: `translateY(${canvasScroll}px)`,
        }}
      />
    </div>
  );
}


export { SlideLanding };
