import clsx from 'clsx';
import {
  TextTitle,
  TextAccent,
  TextSection,
  Text,
  LabeledButton,
  ButtonHolder,
  ScrollElement,
} from 'src/elements';
import { useBio } from 'src/content';

import { Ruler } from './ruler/Ruler';
import { Stack } from './stack/Stack';
import { Blueprint } from './blueprint/Blueprint';
import { DotGrid } from './blueprint/DotGrid';
import { useBlueprints } from './blueprint/useBlueprints';
import { FeaturedProject } from './featured-project/FeaturedProject';
import { Project } from './project/Project';
import * as Style from './SlideProjects.module.scss';

function SlideProjects() {
  const Bio = useBio();
  const [activeBlueprints, randomizeBlueprints] = useBlueprints();

  return (
    <ScrollElement className={Style.slideProjects} name="projects">
      <DotGrid />
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
        <div className={Style.buttonRow}>
          <ButtonHolder className={Style.buttonHolder}>
            <LabeledButton icon="rocket" color="yellow" href="//flanny.app">
              Flanny Apps
            </LabeledButton>
          </ButtonHolder>
          <ButtonHolder className={Style.buttonHolder}>
            <LabeledButton icon="saturn" color="blue" href="https://www.flanny.app/blog">
              Project Blog
            </LabeledButton>
          </ButtonHolder>
        </div>
        <TextSection className={Style.hideMobile}>{Bio.projects.sections[0]}</TextSection>
        <div className={Style.featuredBody}>
          {Bio.projects.projects.featured.map((project) => (
            <FeaturedProject key={project.name} project={project} />
          ))}
        </div>
        <TextSection className={Style.hideMobile}>{Bio.projects.sections[1]}</TextSection>
        <div className={clsx(Style.allBody, Style.hideMobile)}>
          <Stack>
            {Bio.projects.projects.all.map((project) => (
              <Project key={project.name} project={project} name={project.name} />
            ))}
          </Stack>
        </div>
      </div>
    </ScrollElement>
  );
}

export { SlideProjects };
