import React from "react";

import { Ruler, TextHeading, TextAccent } from "../../elements";

import Projects from "./data/projects.json";
import { FeaturedProject } from "./featured-project";
// import { BlueprintDecoration } from './blueprint-decoration'
import { Project } from "./project";
import Style from "./style.module.scss";

// const INVENTIONS = [
//   'What-if Machine',
//   'Portal Gun',
//   'Arc Reactor',
//   'Bending Unit',
//   'Smell-O-Scope',
//   'Space Elevator',
//   'Web Shooter',
//   'Repulsor',
//   'Microverse Battery',
//   'Dyson Sphere',
//   'J.A.R.V.I.S.',
//   'Shrink Ray',
//   'Electron Carpet',
//   'Mind Control Tie',
//   'Memory Ray',
//   'Flux Capacitor'
// ];

class SlideProjects extends React.Component {
  // constructor(props){
  //   super(props);

  //   this.inventions = INVENTIONS;

  //   this.state = {
  //     invention1: this.getRandomInvention(),
  //     invention2: this.getRandomInvention()
  //   }

  //   this.getRandomInvention = this.getRandomInvention.bind(this);
  // }

  // getRandomInvention() {
  //   const index = Math.floor(Math.random() * this.inventions.length);
  //   const invention = this.inventions[index];
  //   this.inventions.splice(index, 1);
  //   return invention;
  // };

  render() {
    const { data } = this.props;
    return (
      <div>
        {/* <BlueprintDecoration num={1} invention={this.state.invention1} gap={42} edge={'top'} />
        <BlueprintDecoration num={2} invention={this.state.invention2} gap={32} edge={'top'} /> */}
        <div className={`${Style.slideProjects} ${Style.blueprint}`}>
          <div className={Style.slideBody}>
            <TextAccent>Some of my</TextAccent>
            <TextHeading>Projects</TextHeading>
            <div className={Style.featuredBody}>
              {Projects.featured.map((project, i) => (
                <FeaturedProject
                  key={i}
                  name={project.name}
                  description={project.description}
                  link={project.link}
                  image={project.image}
                  data={data}
                  gap={48}
                  edge={"top"}
                />
              ))}
              <div className={Style.allBody}>
                {Projects.all.map((project, i) => (
                  <Project
                    key={i}
                    name={project.name}
                    description={project.description}
                    link={project.link}
                    image={project.image}
                    gap={12}
                    edge={"top"}
                    data={data}
                  />
                ))}
              </div>
            </div>
          </div>
          <Ruler />
        </div>
      </div>
    );
  }
}

export { SlideProjects };
