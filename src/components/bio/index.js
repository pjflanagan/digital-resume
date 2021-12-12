import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";

import { Cover, Footer, Splash, Header, HeaderLink } from "src/elements";

import { SlideLanding } from "./0-landing";
import { SlidePersonal } from "./1-personal";
import { SlideExperience } from "./2-experience";
import { SlideProjects } from "./3-projects";
import { SlideContact } from "./4-contact";

import * as Style from "./style.module.scss";

const ScrollComponent = Scroll.Element;

const BioComponent = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  });

  return (
    <div className={Style.container}>
      <Header>
        <HeaderLink onClick={() => { }}>0. Bio</HeaderLink>
        <HeaderLink onClick={() => { }}>1. Experience</HeaderLink>
        <HeaderLink onClick={() => { }}>2. Projects</HeaderLink>
        <HeaderLink onClick={() => { }}>3. Contact</HeaderLink>
      </Header>
      <Cover />
      <Splash isVisible={isLoading} />
      <SlideLanding />
      <ScrollComponent className={Style.slides} name="slides">
        <SlidePersonal data={data} />
        <SlideExperience data={data} />
        <SlideProjects data={data} />
        <SlideContact data={data} />
        <Footer />
      </ScrollComponent>
    </div>
  );
}

export { BioComponent };
