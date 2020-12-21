
import React from 'react';

import Jobs from './jobs.json';
import Projects from './projects.json';
import Schools from './schools.json';
import Skills from './skills.json';
import Links from './links.json';
import Slides from './slides.json';

const FindImage = ({ data: { allFile: { edges }}, image }) => {
  return edges.find(({ node }) => node.base === image ).node;
}

const ParseTextForLinks = (text) => {
  // parse text for links and insert outbound links
  // need to use this in Personal, Experience, and maybe Project slide
  return (
    <span></span>
  );
};

export { FindImage, ParseTextForLinks, Jobs, Projects, Schools, Skills, Links, Slides };