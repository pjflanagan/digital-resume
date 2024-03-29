import React from "react";
import * as Scroll from 'react-scroll';

import {
  Ruler,
  TextTitle,
  TextAccent,
  TextSection,
  Text,
  Stack,
  LabeledButton
} from "src/elements";
import { Bio } from "src/content";

import { FeaturedProject } from "./featured-project";
import { Project } from "./project";
import * as Style from "./style.module.scss";

const ScrollComponent = Scroll.Element;

const SlideProjects = ({ data }) => {
  return (
    <ScrollComponent className={`${Style.slideProjects} ${Style.blueprint}`} name="projects">
      <Ruler className={Style.ruler} />
      <div className={Style.slideBody}>
        <TextAccent>{Bio.projects.accent}</TextAccent>
        <TextTitle>{Bio.projects.title}</TextTitle>
        <Text links={Bio.projects.link_text.links}>
          {Bio.projects.link_text.text[0]}
        </Text>
        <TextSection>{Bio.projects.sections[0]}</TextSection>
        <div className={Style.featuredBody}>
          {Bio.projects.projects.featured.map((project, i) => (
            <FeaturedProject
              key={i}
              project={project}
              data={data}
            />
          ))}
        </div>
        <TextSection>{Bio.projects.sections[1]}</TextSection>
        <div className={Style.allBody}>
          <Stack>
            {Bio.projects.projects.all.map((project, i) => (
              <Project
                key={i}
                project={project}
                name={project.name}
                data={data}
              />
            ))}
          </Stack>
        </div>
        <div className={Style.buttonHolder}>
          <LabeledButton
            icon="saturn"
            trackerLabel="bio.goToBlog"
            href="/blog"
          >
            See Project Portfolio
          </LabeledButton>

        </div>
      </div>
    </ScrollComponent>
  );
}


export { SlideProjects };
