import { GatsbyImage } from 'gatsby-plugin-image';

import { Text, TextLinkedHeader } from 'src/elements';
import { FindImage } from 'src/content';
import type { ImageQueryData, Project as ProjectContent } from 'src/content';

import * as Style from './Project.module.scss';

type ProjectProps = {
  data: ImageQueryData;
  project: ProjectContent;
  name?: string;
};

const Project = ({ data, project: { name, link, description, image } }: ProjectProps) => {
  const imageData = FindImage({ image, data });
  return (
    <div className={Style.project}>
      {imageData && (
        <GatsbyImage
          image={imageData.childImageSharp.gatsbyImageData}
          alt={name}
          className={Style.projectImage}
        />
      )}
      <div className={Style.info}>
        <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
        <Text>{description}</Text>
      </div>
    </div>
  );
};

export { Project };
