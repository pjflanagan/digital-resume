import React, { useRef } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import classNames from "classnames";

import { useReveal } from "src/hooks";

import * as Style from "./style.module.scss";

type AvatarProps = {
  image: any;
  name: string;
  background: string;
}

const Avatar = ({ image, name, background }: AvatarProps) => {

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 132 });
  const className = classNames(Style.avatarHolder, {
    [Style.reveal]: isRevealed
  });

  return (
    <div
      className={className}
      ref={ref}
    >
      <div
        className={Style.avatarImageHolder}
        style={{ background: background }}
      >
        <GatsbyImage
          image={image.childImageSharp.gatsbyImageData}
          alt={name}
          className={Style.avatarImage} />
      </div>
      <div className={Style.avatarBack} />
    </div>
  );
}

export { Avatar };
