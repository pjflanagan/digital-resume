import { FC } from 'react';
import { useWindowScroll } from 'react-use';

import { Canvas } from 'src/elements';

import { View } from './view/View';
import { Body } from './body/Body';
import * as Style from './SlideLanding.module.scss';

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
};

export { SlideLanding };
