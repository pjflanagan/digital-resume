

import * as React from "react";

import { useScroll } from 'src/hooks';

import * as Style from '../style.module.scss';

const PostHeaderImageComponent = ({
  src,
}) => {
  const scroll = useScroll();
  return (
    <div
      className={Style.headerImage}
      style={{
        backgroundImage: `url("${src}")`,
        top: -scroll / 4
      }}
    />
  );
}

export { PostHeaderImageComponent };
