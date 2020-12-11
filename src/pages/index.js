import * as React from "react";
import "./style.scss";
import { SlideSplash, SlidePersonal, SlideExperience, SlideProjects, SlideContact } from "./slides";
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
        <SlideContact />
      </div>
    </div>
  );
};

export default IndexPage;
