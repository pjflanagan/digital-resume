import { useEffect, useRef } from 'react';
import * as Scroll from 'react-scroll';

import { LabeledButton, TextPageCenter } from 'src/elements';
import { useBio } from 'src/content';

import * as ButtonStyle from 'src/elements/button/Button.module.scss';
import * as Style from './LandingBody.module.scss';

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

  useEffect(() => {
    let rafId: number | null = null;
    const applyScroll = () => {
      rafId = null;
      const y = window.scrollY;
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${-y / 5}px)`;
      }
      if (buttonHolderRef.current) {
        buttonHolderRef.current.style.filter = `opacity(${1.0 - y / 1000.0})`;
      }
    };
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(applyScroll);
      }
    };
    applyScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

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
        <LabeledButton
          icon="rocket"
          onClick={() => clickToScroll()}
          className={ButtonStyle.yellow}
        >
          {prompt}
        </LabeledButton>
      </div>
    </>
  );
};

export { LandingBody };
