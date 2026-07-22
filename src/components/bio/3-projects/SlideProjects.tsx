import { useState, useEffect, type CSSProperties } from 'react';
import clsx from 'clsx';

import {
  Ruler,
  TextTitle,
  TextAccent,
  TextSection,
  Text,
  Stack,
  LabeledButton,
  ButtonHolder,
  ScrollElement,
} from 'src/elements';
import { useBio } from 'src/content';

import { Blueprint, type BlueprintName } from './blueprint/Blueprint';
import { FeaturedProject } from './featured-project/FeaturedProject';
import { Project } from './project/Project';
import * as Style from './SlideProjects.module.scss';

const BLUEPRINT_POOL: BlueprintName[] = [
  'tree-of-life',
  'golden-record',
  'arc-reactor',
  'dummy-plug',
  'bender',
];

interface ActiveBlueprint {
  name: BlueprintName;
  style: CSSProperties;
}

function generateBlueprints(): ActiveBlueprint[] {
  // Shuffle and select 2 unique names from the pool
  const shuffled = [...BLUEPRINT_POOL].sort(() => 0.5 - Math.random());
  const name1 = shuffled[0];
  const name2 = shuffled[1];

  // Blueprint 1 (Top Zone, offset vertically 2% to 22%, bleeding off left/right edge)
  const side1 = Math.random() > 0.5 ? 'left' : 'right';
  const size1 = Math.floor(Math.random() * 200) + 500; // 500px to 700px
  const vOffset1 = Math.floor(Math.random() * 20) + 2; // top: 2% to 22%
  const hOffset1 = -Math.floor(Math.random() * 150) - 150; // -150px to -300px
  const rotate1 = Math.floor(Math.random() * 60) - 30; // -30deg to 30deg

  const style1: CSSProperties = {
    position: 'absolute',
    width: `${size1}px`,
    height: `${size1}px`,
    top: `${vOffset1}%`,
    [side1]: `${hOffset1}px`,
    transform: `rotate(${rotate1}deg)`,
  };

  // Blueprint 2 (Bottom Zone, offset vertically 2% to 22%, bleeding off left/right edge)
  const side2 = Math.random() > 0.5 ? 'left' : 'right';
  const size2 = Math.floor(Math.random() * 200) + 500; // 500px to 700px
  const vOffset2 = Math.floor(Math.random() * 20) + 2; // bottom: 2% to 22%
  const hOffset2 = -Math.floor(Math.random() * 150) - 150; // -150px to -300px
  const rotate2 = Math.floor(Math.random() * 60) - 30; // -30deg to 30deg

  const style2: CSSProperties = {
    position: 'absolute',
    width: `${size2}px`,
    height: `${size2}px`,
    bottom: `${vOffset2}%`,
    [side2]: `${hOffset2}px`,
    transform: `rotate(${rotate2}deg)`,
  };

  return [
    { name: name1, style: style1 },
    { name: name2, style: style2 },
  ];
}

function SlideProjects() {
  const Bio = useBio();
  const [activeBlueprints, setActiveBlueprints] = useState<ActiveBlueprint[]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setActiveBlueprints(generateBlueprints());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const randomizeBlueprints = () => {
    setActiveBlueprints(generateBlueprints());
  };

  return (
    <ScrollElement className={clsx(Style.slideProjects, Style.blueprint)} name="projects">
      {activeBlueprints.map((bp, index) => (
        <Blueprint key={`${bp.name}-${index}`} name={bp.name} style={bp.style} />
      ))}
      <Ruler className={Style.ruler} />
      <div className={Style.slideBody}>
        <TextAccent mono animate>
          {Bio.projects.accent}
        </TextAccent>
        <TextTitle onClick={randomizeBlueprints}>{Bio.projects.title}</TextTitle>
        <Text links={Bio.projects.linkText.links}>{Bio.projects.linkText.text[0]}</Text>
        <TextSection>{Bio.projects.sections[0]}</TextSection>
        <div className={Style.featuredBody}>
          {Bio.projects.projects.featured.map((project) => (
            <FeaturedProject key={project.name} project={project} />
          ))}
        </div>
        <TextSection>{Bio.projects.sections[1]}</TextSection>
        <div className={Style.allBody}>
          <Stack>
            {Bio.projects.projects.all.map((project) => (
              <Project key={project.name} project={project} name={project.name} />
            ))}
          </Stack>
        </div>
        <ButtonHolder className={Style.buttonHolder}>
          <LabeledButton icon="saturn" color="yellow" href="https://www.flanny.app/blog">
            See Project Blog
          </LabeledButton>
        </ButtonHolder>
      </div>
    </ScrollElement>
  );
}

export { SlideProjects };
