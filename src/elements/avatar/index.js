import React, { useRef } from "react";
import Img from "gatsby-image";

import { FindImage } from "src/content";
import { useReveal } from "src/hooks";

import * as Style from "./style.module.scss";

const Avatar = ({ data, image, name, background }) => {

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 132, edge: 'top' });
  const className = isRevealed ? Style.reveal : "";
  const imageData = FindImage({ data, image });

  return (
    <div
      className={`${Style.avatarHolder} ${className}`}
      ref={ref}
    >
      <div
        className={Style.avatarImageHolder}
        style={{ background: background }}
      >
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          className={Style.avatarImage}
        />
      </div>
      <div className={Style.avatarBack} />
    </div>
  );
}

export { Avatar };
