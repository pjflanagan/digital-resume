import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

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
      <GatsbyImage
        image={imageData.childImageSharp.gatsbyImageData}
        alt={name}
        className={Style.projectImage} />
      <div className={Style.info}>
        <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
        <Text>{description}</Text>
      </div>
    </div>
  );
}

export { Project };
