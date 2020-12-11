import React from 'react'
import Projects from './data/projects.json';
import { FeaturedProject } from './featured-project';
import { BlueprintDecoration } from './blueprint-decoration'
import './style.scss'

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
                    gap={12}
                    edge={'bottom'}
                  />
                ))
              }
            </div>

            {/* <div class="all-body">
              {% for project in site.data.projects.all %}
              <div class="project">
                <div class="project-image"
                  style="background-image: url('{{ site.baseurl }}/files/images/projects/{{ project.image }}')"
                ></div>
                <div class="info">
                  <a href="//{{project.link}}" target="_blank">
                    <h2 class="name">{{ project.name }}</h2>
                    <span class="arrow"></span>
                  </a>
                  <p class="description">{{ project.description }}</p>
                </div>
              </div>
              {% endfor %}
            </div> */}
          </div>
          {/* {% include object-ruler.html %} */}
        </div>
      </div>
    );
  }
}

export { SlideProjects }