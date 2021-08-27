import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";

import { Cover, Footer, Splash } from "src/elements";

import { SlideLanding } from "./0-landing";
import { SlidePersonal } from "./1-personal";
import { SlideExperience } from "./2-experience";
import { SlideProjects } from "./3-projects";
import { SlideContact } from "./4-contact";
import "./style.scss";

const ScrollMain = Scroll.Element;

const MainComponent = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  });

  return (
    <div className="container">
      <Cover />
      <Splash isVisible={isLoading} />
      <SlideLanding />
      <ScrollMain className="slides" name="slides">
        <SlidePersonal data={data} />
        <SlideExperience data={data} />
        <SlideProjects data={data} />
        <SlideContact data={data} />
        <Footer />
      </ScrollMain>
    </div>
  );
}

export { MainComponent };
