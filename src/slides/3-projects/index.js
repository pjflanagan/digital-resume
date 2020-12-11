import React from 'react'
import Projects from './data/projects.json';
import { FeaturedProject } from './featured-project';
import { BlueprintDecoration } from './blueprint-decoration'
import { Project } from './project';
import { Ruler } from '../../elements';
import './style.scss';

const INVENTIONS = [
  'What-if Machine',
  'Portal Gun',
  'Arc Reactor',
  'Bending Unit',
  'Smell-O-Scope',
  'Space Elevator',
  'Web Shooter',
  'Repulsor',
  'Microverse Battery',
  'Dyson Sphere',
  'J.A.R.V.I.S.',
  'Shrink Ray',
  'Electron Carpet',
  'Mind Control Tie',
  'Memory Ray'
];

class SlideProjects extends React.Component {
  constructor(props){
    super(props);

    this.inventions = INVENTIONS;

    this.state = {
      invention1: this.getRandomInvention(),
      invention2: this.getRandomInvention()
    }

    this.getRandomInvention = this.getRandomInvention.bind(this);
  }

  getRandomInvention() {
    const index = Math.floor(Math.random() * this.inventions.length);
    const invention = this.inventions[index];
    this.inventions.splice(index, 1);
    return invention;
  };
  

  render() {
    return (
      <div>
        <BlueprintDecoration num={1} invention={this.state.invention1} gap={42} edge={'top'} />
        <BlueprintDecoration num={2} invention={this.state.invention2} gap={32} edge={'top'} />
        <div class="slide-projects blueprint">
          <h1>Projects</h1>
          {/* <!-- TODO: we want this to be a popup with more details eventually --> */}
          <div class="slide-body">
            <div class="featured-body">
              {
                Projects.featured.map(project => (
                  <FeaturedProject
                    name={project.name}
                    description={project.description}
                    link={project.link}
                    image={project.image}
                    gap={48}
                    edge={'top'}
                  />
                ))
              }
            </div>
            <div class="all-body">
              {
                Projects.all.map(project => (
                  <Project
                    name={project.name}
                    description={project.description}
                    link={project.link}
                    image={project.image}
                    gap={12}
                    edge={'top'}
                  />
                ))
              }
            </div>
          </div>
          <Ruler />
        </div>
      </div>
    );
  }
}

export { SlideProjects }