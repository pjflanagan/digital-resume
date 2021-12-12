import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";

import { Cover, Footer, Splash, Header, HeaderLink } from "src/elements";

import { SlideLanding } from "./0-landing";
import { SlidePersonal } from "./1-personal";
import { SlideExperience } from "./2-experience";
import { SlideProjects } from "./3-projects";
import { SlideContact } from "./4-contact";

import * as Style from "./style.module.scss";

const scroller = Scroll.scroller;

const clickToScroll = (slideName) => {
  scroller.scrollTo(slideName, {
    duration: 1500,
    smooth: true,
    offset: -64, // Scrolls to element + 50 pixels down the page
  });
}

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
        <HeaderLink onClick={() => clickToScroll('personal')}>0. Bio</HeaderLink>
        <HeaderLink onClick={() => clickToScroll('experience')}>1. Experience</HeaderLink>
        <HeaderLink onClick={() => clickToScroll('projects')}>2. Projects</HeaderLink>
        <HeaderLink onClick={() => clickToScroll('contact')}>3. Contact</HeaderLink>
      </Header>
      <Cover />
      <Splash isVisible={isLoading} />
      <SlideLanding />
      <div className={Style.slides}>
        <SlidePersonal data={data} />
        <SlideExperience data={data} />
        <SlideProjects data={data} />
        <SlideContact data={data} />
        <Footer />
      </div>
    </div>
  );
}

export { BioComponent };
