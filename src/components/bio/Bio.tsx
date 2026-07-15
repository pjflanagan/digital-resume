import { useEffect, useState } from 'react';
import * as Scroll from 'react-scroll';

import { ContentProvider, useBio } from 'src/content';
import { Cover, Footer, Splash, Header, HeaderLink } from 'src/elements';

import { SlideLanding } from './0-landing/SlideLanding';
import { SlidePersonal } from './1-personal/SlidePersonal';
import { SlideExperience } from './2-experience/SlideExperience';
import { SlideProjects } from './3-projects/SlideProjects';
import { SlideContact } from './4-contact/SlideContact';

import * as Style from './Bio.module.scss';

const scroller = Scroll.scroller;

const clickToScroll = (slideName: string) => {
  scroller.scrollTo(slideName, {
    duration: 1500,
    smooth: true,
    offset: -64, // Scrolls to element + 50 pixels down the page
  });
};

const BioPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const Bio = useBio();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={Style.container}>
      <Header className={Style.header}>
        <HeaderLink onClick={() => clickToScroll('personal')}>0.0 Bio</HeaderLink>
        <HeaderLink onClick={() => clickToScroll('experience')}>1.0 Experience</HeaderLink>
        <HeaderLink onClick={() => clickToScroll('projects')}>2.0 Projects</HeaderLink>
        <HeaderLink href="https://www.flanny.app/blog">2.1 Blog</HeaderLink>
        <HeaderLink onClick={() => clickToScroll('contact')}>3.0 Contact</HeaderLink>
      </Header>
      <Cover />
      <Splash isVisible={isLoading} />
      <SlideLanding />
      <div className={Style.slides}>
        <SlidePersonal />
        <SlideExperience />
        <SlideProjects />
        <SlideContact />
        <Footer text={Bio.footer} />
      </div>
    </div>
  );
};

const BioComponent = () => (
  <ContentProvider>
    <BioPage />
  </ContentProvider>
);

export { BioComponent };
