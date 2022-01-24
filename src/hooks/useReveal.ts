import { useState, useEffect } from 'react'
import _ from 'lodash'

type UseRevealProps = {
  gap: number;
  ref: any;
}

const useReveal = ({ ref, gap }: UseRevealProps) => {

  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // update our state when observer callback fires
        setIsRevealed(entry.isIntersecting);

        // only update once, we don't want to rereveal (otherwise make a useIntersecting hook)
        if (entry.isIntersecting) {
          observer.unobserve(ref.current);
        }
      },
      { rootMargin: `-${gap}px`, }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return isRevealed;
}

export { useReveal };
