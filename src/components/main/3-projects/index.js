import React from "react";

import {
  Ruler,
  TextHeading,
  TextAccent,
  TextSubHeading,
  Stack,
} from "src/elements";
import { Main } from "src/content";

import { FeaturedProject } from "./featured-project";
import { Project } from "./project";
import Style from "./style.module.scss";

const SlideProjects = ({ data }) => {
  return (
    <>
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
              />
            ))}
          </div>
          <TextSubHeading>{Main.projects.sections[1]}</TextSubHeading>
          <div className={Style.allBody}>
            <Stack>
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
    </>
  );
}


export { SlideProjects };
