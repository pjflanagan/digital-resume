import React from "react";

import { TextHeading, TextSubHeading, TextAccent } from "../../elements";

import Jobs from "./data/jobs.json";
import Schools from "./data/schools.json";
import Style from "./style.module.scss";

import { Org } from "./org";
import { Skills } from "./skills";

const SlideExperience = ({ data }) => {
  return (
    <div className={Style.slideExperience}>
      <div className={Style.preSlideCurveHolder}>
        <div className={Style.preSlideCurve} />
      </div>
      <div className={Style.slideBody}>
        <TextAccent>My digital resume</TextAccent>
        <TextHeading>Experience</TextHeading>
        {/* <Text> */}
        <TextSubHeading>Career</TextSubHeading>
        {Jobs.map((job, i) => (
          <Org
            key={i}
            name={job.name}
            location={job.location}
            time={job.time}
            description={job.description}
            position={job.position}
            image={job.image}
            data={data}
            color={job.color}
            background={job.background}
          />
        ))}

        <TextSubHeading>Education</TextSubHeading>
        {Schools.map((school, i) => (
          <Org
            key={i}
            name={school.name}
            location={school.location}
            time={school.class}
            description={school.description}
            position={school.degree}
            image={school.image}
            data={data}
            color={school.color}
            background={school.background}
          />
        ))}

        <TextSubHeading>Skills</TextSubHeading>
        <Skills />
      </div>
    </div>
  );
};

export { SlideExperience };
