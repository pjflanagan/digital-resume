import React from "react";
import Img from "gatsby-image";

import { Text, TextLinkedHeader } from "src/elements";
import { FindImage } from "src/content";

import * as Style from "./style.module.scss";

const Project = ({
  data,
  project: { name, link, description, image },
}) => {
  const imageData = FindImage({ image, data });
  return (
    <div className={Style.project}>
      <Img
        fluid={imageData.childImageSharp.fluid}
        alt={name}
        className={Style.projectImage}
      />
      <div className={Style.info}>
        <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
        <Text>{description}</Text>
      </div>
    </div>
  );
}

export { Project };
