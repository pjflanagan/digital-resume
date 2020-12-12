import React from "react";
import Img from "gatsby-image";

import { ProgressBar, Reveal } from "../../elements";
import { FindImage } from "../../data";

import Jobs from "./data/jobs.json";
import Schools from "./data/schools.json";
import Skills from "./data/skills.json";
import Style from "./style.module.scss";

class SegmentImage extends Reveal {
  render() {
    const { image, name, data, background } = this.props;
    const translateY = this.state.isRevealed ? -50 : 50;
    const imageData = FindImage({ data, image });

    return (
      <div
        className={Style.imageHolder}
        ref={this.ref}
        style={{ background: background }}
      >
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          style={{ transform: `translateY(${translateY}%)` }}
          className={Style.image}
        />
      </div>
    );
  }
}

const Org = ({
  name,
  time,
  location,
  description,
  position,
  image,
  data,
  color,
  background,
}) => (
  <div className={Style.segment}>
    <SegmentImage
      gap={132}
      edge="top"
      image={image}
      name={name}
      data={data}
      background={background}
    />
    <div className={Style.segmentLeft}>
      <div className={Style.org} style={{ color: color }}>
        {name}
      </div>
      <div className={Style.location}>{location}</div>
      <div className={Style.time}>{time}</div>
    </div>
    <div className={Style.segmentRight}>
      <div className={Style.position}>{position}</div>
      {description.map((line, i) => (
        <p
          key={i}
          className={Style.description}
          dangerouslySetInnerHTML={{ __html: line }}
        ></p>
      ))}
    </div>
  </div>
);

const SlideExperience = ({ data }) => {
  return (
    <div className={Style.slideExperience}>
      <h1>Experience</h1>
      <div className={Style.slideBody}>
        <h2>Career</h2>
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

        <h2>Education</h2>
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

        <h2>Skills</h2>
        {Object.keys(Skills).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            {Skills[key].map((skill) => (
              <ProgressBar
                key={skill.name}
                name={skill.name}
                progress={skill.progress}
                gap={28}
                edge={"bottom"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export { SlideExperience };
