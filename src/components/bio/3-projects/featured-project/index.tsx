import React, { useRef } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { FrameHolder, Text, TextLinkedHeader, TextTag } from "src/elements";
import { FindImage } from "src/content";
import type { ImageQueryData, Project as ProjectContent } from "src/content";
import { useReveal } from "src/hooks"

import * as Style from "./style.module.scss";
import classNames from "classnames";

type FeaturedProjectProps = {
  data: ImageQueryData;
  project: ProjectContent;
};

const FeaturedProject = ({
  data,
  project: { name, link, description, image, tech },
}: FeaturedProjectProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 220 });

  const className = classNames(Style.featuredProject, {
    [Style.hidden]: !isRevealed
  });
  const imageData = FindImage({ data, image });

  return (
    <div className={className} ref={ref}>
      <FrameHolder className={Style.projectImageFrame}>
        {imageData && (
          <GatsbyImage
            image={imageData.childImageSharp.gatsbyImageData}
            alt={name}
            className={Style.projectImage} />
        )}
      </FrameHolder>
      <div className={Style.info}>
        <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
        <Text>{description}</Text>
        <div className={Style.techStackHolder}>
          {(tech || []).map((item) => (
            <TextTag key={item}>{item}</TextTag>
          ))}
        </div>
      </div>
    </div>
  );
}


export { FeaturedProject };
