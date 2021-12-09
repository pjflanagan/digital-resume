import React from 'react';
import * as Scroll from "react-scroll";

import { LabeledButton, TextPageCenter } from "src/elements";
import { Main } from "src/content";
import { useScroll } from 'src/hooks';

import * as Style from './style.module.scss';

const scroller = Scroll.scroller;

const clickToScroll = () => {
  scroller.scrollTo('slides', {
    duration: 1500,
    smooth: true,
    offset: -64, // Scrolls to element + 50 pixels down the page
  });
}

const Body = () => {

  const scroll = useScroll();
  const prompt = Main.splash.prompts[0];

  const textScroll = -scroll / 5;
  const opacity = 1.0 - scroll / 1000.0;

  return (
    <>
      <TextPageCenter
        className={Style.titleContainer}
        style={{
          transform: `translateY(${textScroll}px)`,
        }}
        headline={Main.splash.title}
        blurb={Main.splash.subtitle}
      />
      <div
        className={Style.buttonHolder}
        style={{ filter: `opacity(${opacity})` }}
      >
        <LabeledButton
          icon="down-arrow"
          trackerLabel="Splash.clickToScroll"
          onClick={() => clickToScroll()}
        >
          {prompt}
        </LabeledButton>
      </div>
    </>
  )
}

export { Body };


  // componentDidMount() {
  //   // TODO: this might be wrong...
  //   // we don't want to re-render on scroll
  //   window.addEventListener('scroll', _.throttle(this.handleScroll, 40));
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', _.throttle(this.handleScroll, 40));
  // }

  // handleScroll(e) {
  //   this.setState({
  //     scroll: 
  //   });
  // }