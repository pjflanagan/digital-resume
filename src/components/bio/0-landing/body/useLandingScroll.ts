import { useEffect, RefObject } from 'react';

type UseLandingScrollProps = {
  titleRef: RefObject<HTMLDivElement | null>;
  buttonHolderRef: RefObject<HTMLDivElement | null>;
};

// Applies parallax to the title and fades out the button on scroll, driven by rAF to avoid layout thrash.
const useLandingScroll = ({ titleRef, buttonHolderRef }: UseLandingScrollProps): void => {

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
  }, [titleRef, buttonHolderRef]);
};

export { useLandingScroll };
