import React from "react";
import * as Scroll from 'react-scroll';

import {
  TextTitle,
  TextSection,
  TextAccent,
  Text,
  ShowMore,
} from "src/elements";
import { Bio } from "src/content";

import { Org } from "./org";
import { Skills } from "./skills";
import * as Style from "./style.module.scss";

const ScrollComponent = Scroll.Element;

const SlideExperience = ({ data }) => {
  return (
    <ScrollComponent className={Style.slideExperience} name="experience">
      <div className={Style.preSlideCurveHolder}>
        <div className={Style.preSlideCurve} />
      </div>
      <div className={Style.slideBody}>
        <TextAccent>{Bio.experience.accent}</TextAccent>
        <TextTitle>{Bio.experience.title}</TextTitle>
        <Text links={Bio.experience.link_text.links}>
          {Bio.experience.link_text.text[0]}
        </Text>
        <TextSection>{Bio.experience.sections[0]}</TextSection>
        {Bio.experience.jobs.featured.map((job, i) => (
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
        <ShowMore trackerLabel="Experience.showMore.work">
          {Bio.experience.jobs.other.map((job, i) => (
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

        <TextSection>{Bio.experience.sections[1]}</TextSection>
        {Bio.experience.schools.featured.map((school, i) => (
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
            extra={school.extra}
          />
        ))}
        <ShowMore trackerLabel="Experience.showMore.school">
          {Bio.experience.schools.other.map((school, i) => (
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
              extra={school.extra}
            />
          ))}
        </ShowMore>

        <TextSection>{Bio.experience.sections[2]}</TextSection>
        <Skills />
      </div>
    </ScrollComponent>
  );
};

export { SlideExperience };
