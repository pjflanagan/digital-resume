import * as React from "react";
import "./style.scss";
import { SlideSplash, SlidePersonal, SlideExperience, SlideProjects } from "./slides";
import { Cover } from '../elements'

// markup
const IndexPage = () => {
  return (
    <div className="container">
      <Cover />
      <SlideSplash />
      <div className="slides">
        <SlidePersonal />
        <SlideExperience />
        <SlideProjects />
      </div>
    </div>
  );
};

export default IndexPage;
