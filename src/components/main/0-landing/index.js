import React from "react";

import { Canvas } from "src/elements";
import { useScroll } from "src/hooks";

import { View } from "./view";
import { Body } from "./body";
import Style from "./style.module.scss";


// SlideLanding

const SlideLanding = () => {
  const canvasScroll = useScroll({ max: window.innerHeight * 2 }) / 2;
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
