import { useRef } from 'react';

import { FrameHolder, Image, Text, TextLinkedHeader, TextTag } from 'src/elements';
import type { Project as ProjectContent } from 'src/content';
import { contentImage } from 'src/content';
import { useReveal } from 'src/hooks';

import * as Style from './FeaturedProject.module.scss';
import clsx from 'clsx';

type FeaturedProjectProps = {
  project: ProjectContent;
};

const FeaturedProject = ({
  project: { name, link, description, image, tech },
}: FeaturedProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 220 });

  const className = clsx(Style.featuredProject, {
    [Style.hidden]: !isRevealed,
  });

  return (
    <div className={className} ref={ref}>
      <FrameHolder className={Style.projectImageFrame}>
        <Image src={contentImage('projects', image)} alt={name} className={Style.projectImage} />
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
};

export { FeaturedProject };
