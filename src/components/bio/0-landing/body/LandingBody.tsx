import { useEffect, useMemo, useRef, useState } from 'react';
import * as Scroll from 'react-scroll';

import { LabeledButton, SplashText, ButtonHolder, Glitch } from 'src/elements';
import { useBio } from 'src/content';
import { Random } from 'src/helpers';

import { SHIP_FIRE_EVENT } from '../view/constants';
import * as Style from './LandingBody.module.scss';
import { useLandingScroll } from './useLandingScroll';

const scroller = Scroll.scroller;

function clickToScroll() {
  scroller.scrollTo('personal', {
    duration: 1500,
    smooth: true,
    offset: -64, // Scrolls to element + 50 pixels down the page
  });
}

function fireShip() {
  window.dispatchEvent(new Event(SHIP_FIRE_EVENT));
}

function LandingBody() {
  const Bio = useBio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const prompt = useMemo(() => Random.fromArray(Bio.splash.prompts), []);

  const titleRef = useRef<HTMLDivElement>(null);
  const buttonHolderRef = useRef<HTMLDivElement>(null);

  useLandingScroll({ titleRef, buttonHolderRef });

  const [glitchIndex, setGlitchIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlitchIndex((i) => i + 1);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div ref={titleRef} className={Style.titleHolder}>
        <SplashText
          className={Style.title}
          headline={
            <Glitch glitchIndex={glitchIndex} strength="strong">
              {Bio.splash.title}
            </Glitch>
          }
          blurb={Bio.splash.subtitle}
          onHeadlineClick={fireShip}
        />
      </div>
      <ButtonHolder buttonHolderRef={buttonHolderRef} className={Style.buttonHolder}>
        <div className={Style.side}>
          <LabeledButton icon="rocket" scale={0.8} color="red" href="//flanny.app">
            Flanny Apps
          </LabeledButton>
        </div>
        <LabeledButton
          icon="arrowDown"
          color="blue"
          bold
          scale={1.2}
          onClick={() => clickToScroll()}
        >
          {prompt}
        </LabeledButton>
        <div className={Style.side} />
      </ButtonHolder>
    </>
  );
}

export { LandingBody };
