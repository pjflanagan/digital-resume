import { Image, Text, TextLinkedHeader } from 'src/elements';
import type { Project as ProjectContent } from 'src/content';

import * as Style from './Project.module.scss';

const IMG_ROOT = '/img/bio/3-projects';

type ProjectProps = {
  project: ProjectContent;
  name?: string;
};

const Project = ({ project: { name, link, description, image } }: ProjectProps) => {
  return (
    <div className={Style.project}>
      <Image src={`${IMG_ROOT}/${image}`} alt={name} className={Style.projectImage} />
      <div className={Style.info}>
        <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
        <Text>{description}</Text>
      </div>
    </div>
  );
};

export { Project };
