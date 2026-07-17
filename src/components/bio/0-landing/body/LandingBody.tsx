import { useRef } from 'react';
import * as Scroll from 'react-scroll';

import { LabeledButton, TextPageCenter } from 'src/elements';
import { useBio } from 'src/content';

import * as Style from './LandingBody.module.scss';
import { useLandingScroll } from './useLandingScroll';

const scroller = Scroll.scroller;

const clickToScroll = () => {
  scroller.scrollTo('personal', {
    duration: 1500,
    smooth: true,
    offset: -64, // Scrolls to element + 50 pixels down the page
  });
};

const LandingBody = () => {
  const Bio = useBio();
  const prompt = Bio.splash.prompts[0];

  const titleRef = useRef<HTMLDivElement>(null);
  const buttonHolderRef = useRef<HTMLDivElement>(null);

  useLandingScroll({ titleRef, buttonHolderRef });

  return (
    <>
      <div ref={titleRef} className={Style.titleWrap}>
        <TextPageCenter
          className={Style.titleContainer}
          headline={Bio.splash.title}
          blurb={Bio.splash.subtitle}
          mono
          animate
        />
      </div>
      <div ref={buttonHolderRef} className={Style.buttonHolder}>
        <LabeledButton icon="rocket" color="yellow" onClick={() => clickToScroll()}>
          {prompt}
        </LabeledButton>
      </div>
    </>
  );
};

export { LandingBody };
