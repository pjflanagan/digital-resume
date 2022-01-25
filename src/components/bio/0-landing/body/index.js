import React from 'react';
import * as Scroll from "react-scroll";
import { useWindowScroll } from 'react-use';

import { LabeledButton, TextPageCenter } from "src/elements";
import { Bio } from "src/content";

import * as Style from './style.module.scss';

const scroller = Scroll.scroller;

const clickToScroll = () => {
  scroller.scrollTo('personal', {
    duration: 1500,
    smooth: true,
    offset: -64, // Scrolls to element + 50 pixels down the page
  });
}

const Body = () => {

  const { y } = useWindowScroll();
  const prompt = Bio.splash.prompts[0];

  const textScroll = -y / 5;
  const opacity = 1.0 - y / 1000.0;

  return (
    <>
      <TextPageCenter
        className={Style.titleContainer}
        style={{
          transform: `translateY(${textScroll}px)`,
        }}
        headline={Bio.splash.title}
        blurb={Bio.splash.subtitle}
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
