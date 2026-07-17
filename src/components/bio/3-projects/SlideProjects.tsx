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

import { FeaturedProject } from './featured-project/FeaturedProject';
import { Project } from './project/Project';
import * as Style from './SlideProjects.module.scss';

function SlideProjects() {
  const Bio = useBio();
  return (
    <ScrollElement className={clsx(Style.slideProjects, Style.blueprint)} name="projects">
      <Ruler className={Style.ruler} />
      <div className={Style.slideBody}>
        <TextAccent mono animate>
          {Bio.projects.accent}
        </TextAccent>
        <TextTitle>{Bio.projects.title}</TextTitle>
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
