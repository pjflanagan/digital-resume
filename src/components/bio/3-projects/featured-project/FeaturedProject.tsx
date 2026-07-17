import { useRef } from 'react';

import { Text, TextLinkedHeader, TextTag, FramedImage } from 'src/elements';
import type { Project as ProjectContent } from 'src/content';
import { contentImage } from 'src/content';
import { useReveal } from 'src/hooks';

import * as Style from './FeaturedProject.module.scss';
import clsx from 'clsx';

type FeaturedProjectProps = {
  project: ProjectContent;
};

function FeaturedProject({
  project: { name, link, description, image, tech },
}: FeaturedProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 220 });

  const className = clsx(Style.featuredProject, {
    [Style.hidden]: !isRevealed,
  });

  return (
    <div className={className} ref={ref}>
      <FramedImage
        layout="inset"
        src={contentImage('projects', image)}
        alt={name}
        frameClassName={Style.projectImageFrame}
        imageClassName={Style.projectImage}
      />
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
