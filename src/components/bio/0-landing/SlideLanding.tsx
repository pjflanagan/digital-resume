import { ReactNode, useEffect, useState } from 'react';

import { Canvas } from 'src/elements';

import { View } from './view/View';
import { LandingBody } from './body/LandingBody';
import * as Style from './SlideLanding.module.scss';

function SlideLanding(): ReactNode {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const canvasScroll = y / 2;
  return (
    <div className={Style.splash}>
      <LandingBody />
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
