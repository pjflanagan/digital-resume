import { Image, Text, TextLinkedHeader } from 'src/elements';
import { contentImage } from 'src/content';
import type { Project as ProjectContent } from 'src/content';

import * as Style from './Project.module.scss';

type ProjectProps = {
  project: ProjectContent;
  name?: string;
};

const Project = ({ project: { name, link, description, image } }: ProjectProps) => {
  return (
    <div className={Style.project}>
      <Image src={contentImage('projects', image)} alt={name} className={Style.projectImage} />
      <div className={Style.info}>
        <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
        <Text>{description}</Text>
      </div>
    </div>
  );
};

export { Project };
