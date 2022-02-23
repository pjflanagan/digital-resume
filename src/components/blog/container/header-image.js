

import * as React from "react";
import { useWindowScroll } from "react-use";

import * as Style from './style.module.scss';

const HeaderImage = ({
  src,
}) => {
  const y = useWindowScroll();
  return (
    <div
      className={Style.headerImage}
      style={{
        backgroundImage: `url("${src}")`,
        transform: `translateY(${-y / 4}px)`,
      }}
    />
  );
}

export { HeaderImage };
