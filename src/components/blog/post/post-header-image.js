

import * as React from "react";

import * as Style from '../style.module.scss';

const PostHeaderImageComponent = ({
  src,
}) => {
  return (
    <div
      className={Style.headerImage}
      style={{
        backgroundImage: `url("${src}")`
      }}
    />
  );
}

export { PostHeaderImageComponent };
