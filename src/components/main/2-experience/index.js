import React from "react";

import {
  TextHeading,
  TextSubHeading,
  TextAccent,
  ShowMore,
} from "../../../elements";
import { Main } from "../../../content";

import { Org } from "./org";
import { Skills } from "./skills";
import Style from "./style.module.scss";

const SlideExperience = ({ data }) => {
  return (
    <div className={Style.slideExperience}>
      <div className={Style.preSlideCurveHolder}>
        <div className={Style.preSlideCurve} />
      </div>
      <div className={Style.slideBody}>
        <TextAccent>{Main.experience.accent}</TextAccent>
        <TextHeading>{Main.experience.title}</TextHeading>
        {/* <Text> */}
        <TextSubHeading>{Main.experience.sections[0]}</TextSubHeading>
        {Main.experience.jobs.featured.map((job, i) => (
          <Org
            key={i}
            name={job.name}
            location={job.location}
            time={job.time}
            links={job.links}
            description={job.description}
            position={job.position}
            image={job.image}
            data={data}
            color={job.color}
            background={job.background}
          />
        ))}
        <ShowMore trackerLabel="Experience.showMore">
          {Main.experience.jobs.other.map((job, i) => (
            <Org
              key={i}
              name={job.name}
              location={job.location}
              time={job.time}
              links={job.links}
              description={job.description}
              position={job.position}
              image={job.image}
              data={data}
              color={job.color}
              background={job.background}
            />
          ))}
        </ShowMore>

        <TextSubHeading>{Main.experience.sections[1]}</TextSubHeading>
        {/* TODO: kinda want my extracurriculars here still */}
        {Main.experience.schools.map((school, i) => (
          <Org
            key={i}
            name={school.name}
            location={school.location}
            time={school.class}
            links={school.links}
            description={school.description}
            position={school.degree}
            image={school.image}
            data={data}
            color={school.color}
            background={school.background}
          />
        ))}

        <TextSubHeading>{Main.experience.sections[2]}</TextSubHeading>
        <Skills />
      </div>
    </div>
  );
};

export { SlideExperience };
