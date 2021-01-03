import React from "react";

import {
  Ruler,
  TextHeading,
  TextAccent,
  TextSubHeading,
  Stack,
} from "../../../elements";
import { Main } from "../../../content";

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
            <TextAccent>{Main.projects.accent}</TextAccent>
            <TextHeading>{Main.projects.title}</TextHeading>
            <TextSubHeading>{Main.projects.sections[0]}</TextSubHeading>
            <div className={Style.featuredBody}>
              {Main.projects.projects.featured.map((project, i) => (
                <FeaturedProject
                  key={i}
                  project={project}
                  data={data}
                  gap={220}
                  edge={"top"}
                />
              ))}
            </div>
            <TextSubHeading>{Main.projects.sections[1]}</TextSubHeading>
            <div className={Style.allBody}>
              <Stack edge="top" gap={240}>
                {Main.projects.projects.all.map((project, i) => (
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

export { SlideProjects };
