import React, { useEffect, useState } from 'react';

import * as Style from './BillCypher.module.scss';

type BillPosition = {
  top: number;
  left: number;
  deg: number;
};

const randomPosition = (): BillPosition => {
  const top = -40 + Math.random() * 50;
  const left = -40 + Math.random() * 80;
  const deg = Math.random() * 359;
  return {
    top,
    left,
    deg,
  };
};

const randomInterval = () => Math.random() * 2800 + 2800;

const BillCypher: React.FC = () => {
  const [{ top, left, deg }, setPosition] = useState<BillPosition>(randomPosition);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const changePosition = () => {
      setPosition(randomPosition());
      timeout = setTimeout(changePosition, randomInterval());
    };
    changePosition();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={Style.bill}
      style={{
        transform: `translate(calc(-50% + ${left}%), calc(-50% + ${top}%)) rotate(${deg}deg)`,
      }}
    >
      <div className={Style.billBody}>
        <div className={Style.hat}></div>
        <div className={`${Style.triangle} ${Style.topLeft}`}></div>
        <div className={`${Style.triangle} ${Style.topRight}`}></div>
        <div className={`${Style.triangle} ${Style.bottomLeftTop}`}></div>
        <div className={`${Style.triangle} ${Style.bottomLeftBottom}`}></div>
        <div className={`${Style.triangle} ${Style.bottomRightTop}`}></div>
        <div className={`${Style.triangle} ${Style.bottomRightBottom}`}></div>
        <div className={Style.rotater}>
          <div className={Style.eye}></div>
        </div>
        {/* <div className={`${Style.arm} ${Style.armLeft}`}></div>
        <div className={`${Style.arm} ${Style.armRight}`}></div> */}
        <div className={Style.legs}></div>
      </div>
    </div>
  );
};

export { BillCypher };
