import React from "react";
import Img from "gatsby-image";

import "./style.scss";
import Jobs from "./data/jobs.json";
import Schools from "./data/schools.json";
import Skills from "./data/skills.json";
import { ProgressBar, Reveal } from "../../elements";
import { FindImage } from '../../data'

class SegmentImage extends Reveal {
  render() {
    const { job, data } = this.props;
    const translateY = this.state.isRevealed ? 0 : 32;
    const imageData = FindImage({ data, image: job.image });

    return (
      <div className={`image-holder ${job.className}`} gap={32} edge="top" ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={job.name}
          style={{ transform: `translateY(${translateY}px)` }}
        />
      </div>
    );
  }
}

const SlideExperience = ({ data }) => {
  return (
    <div className="slide-experience">
      <h1>Experience</h1>
      <div className="slide-body">
        <h2>Career</h2>
        {Jobs.map((job) => (
          <div className="segment">
            <SegmentImage job={job} data={data} />
            <div className="segment-left">
              <div className={`org ${job.className}`}>{job.company}</div>
              <div className="location">{job.location}</div>
              <div className="time">{job.time}</div>
            </div>
            <div className="segment-right">
              <div className="position">{job.position}</div>
              {job.description.map((line) => (
                <p
                  className="description"
                  dangerouslySetInnerHTML={{ __html: line }}
                ></p>
              ))}
            </div>
          </div>
        ))}

        <h2>Education</h2>
        {Schools.map((school) => (
          <div className="segment">
            <SegmentImage job={school} edge="top" gap={32} data={data} />
            <div className="segment-left">
              <div className={`org ${school.className}`}>{school.name}</div>
              <div className="location">{school.location}</div>
              <div className="time">{school.class}</div>
            </div>
            <div className="segment-right">
              {!!school.degree && (
                <div className="position">{school.degree}</div>
              )}
              {school.description.map((line) => (
                <p
                  className="description"
                  dangerouslySetInnerHTML={{ __html: line }}
                ></p>
              ))}
            </div>
          </div>
        ))}

        <h2>Skills</h2>
        {Object.keys(Skills).map((key) => (
          <div>
            <h3>{key}</h3>
            {Skills[key].map((skill) => (
              <ProgressBar
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
