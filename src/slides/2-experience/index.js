import React from "react";

import "./style.scss";
import Jobs from "./data/jobs.json";
import Schools from "./data/schools.json";
import Skills from "./data/skills.json";
import { ProgressBar } from '../../elements';

const SlideExperience = () => {
  return (
    <div className="slide-experience">
      <h1>Experience</h1>
      <div className="slide-body">
        <h2>Career</h2>
        {Jobs.map((job) => (
          <div className="segment">
            <div className={`image-holder ${ job.className }`}>
              <img src={`../../../static/img/experience/${ job.image }`} alt={job.company} />
            </div>
            <div className="segment-left">
              <div className={`org ${ job.className }`}>{job.company}</div>
              <div className="location">{job.location}</div>
              <div className="time">{job.time}</div>
            </div>
            <div className="segment-right">
              <div className="position">{job.position}</div>
              {job.description.map((line) => (
                <p className="description" dangerouslySetInnerHTML={{__html: line}}></p>
              ))}
            </div>
          </div>
        ))}

        <h2>Education</h2>
        {Schools.map((school) => (
          <div className="segment">
            <div className={`image-holder ${ school.className }`}>
              <img src={`../../../static/img/experience/${ school.image }`} alt={school.name} />
            </div>
            <div className="segment-left">
              <div className={`org ${school.classNameName}`}>{school.name}</div>
              <div className="location">{school.location}</div>
              <div className="time">{school.class}</div>
            </div>
            <div className="segment-right">
              {
                !!school.degree && <div className="position">{school.degree}</div>
              }
              {school.description.map((line) => (
                <p className="description" dangerouslySetInnerHTML={{__html: line}}></p>
              ))}
            </div>
          </div>
        ))}

        <h2>Skills</h2>
        {
          Object.keys(Skills).map(key => (
            <div>
              <h3>{ key }</h3>
              {
                Skills[key].map((skill) => (
                  <ProgressBar name={skill.name} progress={skill.progress} gap={28} edge={'bottom'} />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export { SlideExperience };
