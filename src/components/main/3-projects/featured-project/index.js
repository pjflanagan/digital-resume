import React, { useRef } from "react";
import Img from "gatsby-image";

import { FrameHolder, Text, TextLinkedHeader, TextLittle } from "src/elements";
import { FindImage } from "src/content";
import { useReveal } from "src/hooks"

import * as Style from "./style.module.scss";

const FeaturedProject = ({
  data,
  project: { name, link, description, image, tech },
}) => {

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 220, edge: 'top' });
  const className = isRevealed ? "" : Style.hidden;
  const imageData = FindImage({ data, image });

  return (
    <div className={`${Style.featuredProject} ${className}`} ref={ref}>
      <FrameHolder className={Style.projectImageFrame}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          className={Style.projectImage}
        />
      </FrameHolder>
      <div className={Style.info}>
        <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
        <Text>{description}</Text>
        <div className={Style.techStackHolder}>
          {tech.map((item) => (
            <TextLittle key={item}>{item}</TextLittle>
          ))}
        </div>
      </div>
    </div>
  );
}


export { FeaturedProject };
