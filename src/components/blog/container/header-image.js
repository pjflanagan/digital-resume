

import * as React from "react";

import { useScroll } from 'src/hooks';

import * as Style from './style.module.scss';

const HeaderImage = ({
  src,
}) => {
  const scroll = useScroll();
  return (
    <div
      className={Style.headerImage}
      style={{
        backgroundImage: `url("${src}")`,
        transform: `translateY(${-scroll / 4}px)`,
      }}
    />
  );
}

export { HeaderImage };
