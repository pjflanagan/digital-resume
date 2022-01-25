import React, { FC } from "react";
import { useWindowScroll } from "react-use";

import { Canvas } from "elements";

import { View } from "./view";
import { Body } from "./body";
import * as Style from "./style.module.scss";

// SlideLanding

const SlideLanding: FC = () => {
  const { y } = useWindowScroll();
  const canvasScroll = y / 2;
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
