import React from "react";

import {
  TextHeading,
  TextSubHeading,
  TextAccent,
  ShowMore,
} from "../../../elements";
import { Jobs, Schools, Slides } from "../../../data";

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
        <TextAccent>{Slides.experience.accent}</TextAccent>
        <TextHeading>{Slides.experience.title}</TextHeading>
        {/* <Text> */}
        <TextSubHeading>{Slides.experience.sections[0]}</TextSubHeading>
        {Jobs.featured.map((job, i) => (
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
          {Jobs.other.map((job, i) => (
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

        <TextSubHeading>{Slides.experience.sections[1]}</TextSubHeading>
        {/* TODO: kinda want my extracurriculars here still */}
        {Schools.map((school, i) => (
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

        <TextSubHeading>{Slides.experience.sections[2]}</TextSubHeading>
        <Skills />
      </div>
    </div>
  );
};

export { SlideExperience };
