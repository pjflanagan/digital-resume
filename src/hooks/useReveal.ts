import { useState, useEffect, RefObject } from 'react';

type UseRevealProps = {
  gap: number;
  ref: RefObject<Element | null>;
};

const useReveal = ({ ref, gap }: UseRevealProps): boolean => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // update our state when observer callback fires
        setIsRevealed(entry.isIntersecting);

        // only update once, we don't want to rereveal (otherwise make a useIntersecting hook)
        if (entry.isIntersecting) {
          observer.unobserve(el);
        }
      },
      { rootMargin: `-${gap}px` }
    );
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [ref, gap]);

  return isRevealed;
};

export { useReveal };
