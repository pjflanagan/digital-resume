import React, { useRef } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { FindImage } from "src/content";
import { useReveal } from "src/hooks";

import * as Style from "./style.module.scss";
import classNames from "classnames";

const Avatar = ({ data, image, name, background }) => {

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 132, edge: 'top' });
  const className = classNames(Style.avatarHolder, {
    [Style.reveal]: isRevealed
  });
  const imageData = FindImage({ data, image });

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
          image={imageData.childImageSharp.gatsbyImageData}
          alt={name}
          className={Style.avatarImage} />
      </div>
      <div className={Style.avatarBack} />
    </div>
  );
}

export { Avatar };
