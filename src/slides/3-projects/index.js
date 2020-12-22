import React from "react";

import {
  Ruler,
  TextHeading,
  TextAccent,
  TextSubHeading,
  Stack,
} from "../../elements";
import { Projects, Slides } from "../../data";

import { FeaturedProject } from "./featured-project";
import { Project } from "./project";
import Style from "./style.module.scss";

class SlideProjects extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={`${Style.slideProjects} ${Style.blueprint}`}>
          <Ruler className={Style.ruler} />
          <div className={Style.slideBody}>
            <TextAccent>{Slides.projects.accent}</TextAccent>
            <TextHeading>{Slides.projects.title}</TextHeading>
            <TextSubHeading>{Slides.projects.sections[0]}</TextSubHeading>
            <div className={Style.featuredBody}>
              {Projects.featured.map((project, i) => (
                <FeaturedProject
                  key={i}
                  project={project}
                  data={data}
                  gap={220}
                  edge={"top"}
                />
              ))}
            </div>
            <TextSubHeading>{Slides.projects.sections[1]}</TextSubHeading>
            <div className={Style.allBody}>
              <Stack edge="top" gap={240}>
                {Projects.all.map((project, i) => (
                  <Project
                    key={i}
                    project={project}
                    name={project.name}
                    data={data}
                  />
                ))}
              </Stack>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Arrow = () => (
  <span className={Style.arrow}></span>
);

export { SlideProjects, Arrow };
