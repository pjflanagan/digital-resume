
import Jobs from './jobs.json';
import Projects from './projects.json';
import Schools from './schools.json';
import Skills from './skills.json';
import Slides from './slides.json';

const FindImage = ({ data: { allFile: { edges }}, image }) => {
  return edges.find(({ node }) => node.base === image ).node;
}

export { FindImage, Jobs, Projects, Schools, Skills, Slides };